const Task = require('../models/Task');
const Notification = require('../models/Notification');
const Garden = require('../models/Garden');
const Plant = require('../models/Plant');

/**
 * Run all daily cron tasks
 */
const runDailyTasks = async () => {
  try {
    console.log('🕐 Starting daily cron tasks...');
    
    // Update overdue tasks
    await updateOverdueTasks();
    
    // Send task reminders
    await sendTaskReminders();
    
    // Update plant growth
    await updatePlantGrowth();
    
    // Clean up old notifications
    await cleanupOldNotifications();
    
    console.log('✅ Daily cron tasks completed');
  } catch (error) {
    console.error('❌ Error in daily cron tasks:', error);
  }
};

/**
 * Update overdue tasks
 */
const updateOverdueTasks = async () => {
  try {
    const result = await Task.updateMany(
      {
        status: 'pending',
        dueDate: { $lt: new Date() }
      },
      {
        status: 'overdue'
      }
    );
    
    console.log(`📋 Updated ${result.modifiedCount} overdue tasks`);
  } catch (error) {
    console.error('Error updating overdue tasks:', error);
  }
};

/**
 * Send task reminders
 */
const sendTaskReminders = async () => {
  try {
    const reminderTime = new Date();
    reminderTime.setHours(reminderTime.getHours() + 1); // Tasks due in next hour
    
    const tasks = await Task.find({
      status: 'pending',
      'reminder.enabled': true,
      'reminder.sent': false,
      dueDate: {
        $gte: new Date(),
        $lte: reminderTime
      }
    }).populate('user plant');
    
    for (const task of tasks) {
      await Notification.createNotification({
        user: task.user._id,
        type: 'task_reminder',
        title: `⏰ Task Reminder: ${task.title}`,
        message: `Your task "${task.title}" is due soon`,
        icon: '⏰',
        priority: task.priority,
        relatedModel: 'Task',
        relatedId: task._id,
        actionUrl: '/planner'
      });
      
      task.reminder.sent = true;
      await task.save();
    }
    
    console.log(`⏰ Sent ${tasks.length} task reminders`);
  } catch (error) {
    console.error('Error sending task reminders:', error);
  }
};

/**
 * Update plant growth
 */
const updatePlantGrowth = async () => {
  try {
    const plants = await Plant.find({ status: 'active' });
    
    for (const plant of plants) {
      // Calculate days since planting
      const daysSincePlanting = Math.floor(
        (new Date() - plant.plantedDate) / (1000 * 60 * 60 * 24)
      );
      
      // Update growth stage
      if (daysSincePlanting < 7) {
        plant.growthStage = 'seedling';
      } else if (daysSincePlanting < 30) {
        plant.growthStage = 'vegetative';
      } else if (daysSincePlanting < 60) {
        plant.growthStage = 'flowering';
      } else {
        plant.growthStage = 'mature';
      }
      
      // Increment days growing
      plant.daysGrowing = daysSincePlanting;
      
      await plant.save();
    }
    
    console.log(`🌱 Updated growth for ${plants.length} plants`);
  } catch (error) {
    console.error('Error updating plant growth:', error);
  }
};

/**
 * Clean up old notifications (older than 30 days)
 */
const cleanupOldNotifications = async () => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const result = await Notification.deleteMany({
      createdAt: { $lt: thirtyDaysAgo },
      isRead: true
    });
    
    console.log(`🗑️ Deleted ${result.deletedCount} old notifications`);
  } catch (error) {
    console.error('Error cleaning up notifications:', error);
  }
};

module.exports = {
  runDailyTasks,
  updateOverdueTasks,
  sendTaskReminders,
  updatePlantGrowth,
  cleanupOldNotifications
};
