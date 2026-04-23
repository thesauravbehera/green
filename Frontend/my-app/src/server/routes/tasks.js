const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Task = require('../models/Task');
const Notification = require('../models/Notification');

// @route   GET /api/v1/tasks
// @desc    Get all tasks for logged in user
// @access  Private
router.get('/', protect, async (req, res, next) => {
  try {
    const { status, startDate, endDate, plant, priority } = req.query;
    
    const query = { user: req.user.id };
    
    // Filter by status
    if (status) {
      query.status = status;
    }
    
    // Filter by date range
    if (startDate || endDate) {
      query.dueDate = {};
      if (startDate) query.dueDate.$gte = new Date(startDate);
      if (endDate) query.dueDate.$lte = new Date(endDate);
    }
    
    // Filter by plant
    if (plant) {
      query.plant = plant;
    }
    
    // Filter by priority
    if (priority) {
      query.priority = priority;
    }
    
    const tasks = await Task.find(query)
      .populate('plant', 'name species image')
      .sort({ dueDate: 1 });
    
    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/v1/tasks/:id
// @desc    Get single task
// @access  Private
router.get('/:id', protect, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('plant', 'name species image');
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Check if user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this task'
      });
    }
    
    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/v1/tasks
// @desc    Create new task
// @access  Private
router.post('/', protect, async (req, res, next) => {
  try {
    const taskData = {
      ...req.body,
      user: req.user.id
    };
    
    const task = await Task.create(taskData);
    
    // Create notification for the task
    if (task.reminder.enabled) {
      const reminderTime = new Date(task.dueDate);
      reminderTime.setMinutes(reminderTime.getMinutes() - task.reminder.time);
      
      await Notification.createNotification({
        user: req.user.id,
        type: 'task_reminder',
        title: `Reminder: ${task.title}`,
        message: `Your task "${task.title}" is due soon`,
        icon: '⏰',
        priority: task.priority,
        relatedModel: 'Task',
        relatedId: task._id,
        actionUrl: `/planner`,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      });
    }
    
    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/v1/tasks/:id
// @desc    Update task
// @access  Private
router.put('/:id', protect, async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Check ownership
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }
    
    task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('plant', 'name species image');
    
    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/v1/tasks/:id/complete
// @desc    Mark task as complete
// @access  Private
router.put('/:id/complete', protect, async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Check ownership
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to complete this task'
      });
    }
    
    await task.complete();
    
    // Create achievement notification if applicable
    const completedCount = await Task.countDocuments({
      user: req.user.id,
      status: 'completed'
    });
    
    if (completedCount === 10 || completedCount === 50 || completedCount === 100) {
      await Notification.createNotification({
        user: req.user.id,
        type: 'achievement_unlocked',
        title: '🏆 Achievement Unlocked!',
        message: `You've completed ${completedCount} tasks!`,
        icon: '🏆',
        priority: 'medium',
        actionUrl: '/profile'
      });
    }
    
    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/v1/tasks/:id
// @desc    Delete task
// @access  Private
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Check ownership
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this task'
      });
    }
    
    await task.deleteOne();
    
    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/v1/tasks/stats/overview
// @desc    Get task statistics
// @access  Private
router.get('/stats/overview', protect, async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const weekFromNow = new Date(today);
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    
    const [
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      dueToday,
      dueThisWeek
    ] = await Promise.all([
      Task.countDocuments({ user: req.user.id }),
      Task.countDocuments({ user: req.user.id, status: 'completed' }),
      Task.countDocuments({ user: req.user.id, status: 'pending' }),
      Task.countDocuments({ user: req.user.id, status: 'overdue' }),
      Task.countDocuments({
        user: req.user.id,
        status: { $in: ['pending', 'in_progress'] },
        dueDate: { $gte: today, $lt: tomorrow }
      }),
      Task.countDocuments({
        user: req.user.id,
        status: { $in: ['pending', 'in_progress'] },
        dueDate: { $gte: today, $lt: weekFromNow }
      })
    ]);
    
    res.json({
      success: true,
      data: {
        total: totalTasks,
        completed: completedTasks,
        pending: pendingTasks,
        overdue: overdueTasks,
        dueToday,
        dueThisWeek,
        completionRate: totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
