const Garden = require('../models/Garden');
const Plant = require('../models/Plant');
const Task = require('../models/Task');
const Notification = require('../models/Notification');

/**
 * Check for overdue tasks and notify users
 */
const checkOverdueTasks = async (io) => {
  try {
    const overdueTasks = await Task.find({
      status: 'pending',
      dueDate: { $lt: new Date() }
    }).populate('user plant');
    
    for (const task of overdueTasks) {
      // Update task status
      task.status = 'overdue';
      await task.save();
      
      // Create notification
      await Notification.createNotification({
        user: task.user._id,
        type: 'task_overdue',
        title: '⚠️ Task Overdue',
        message: `Your task "${task.title}" is overdue`,
        icon: '⚠️',
        priority: 'high',
        relatedModel: 'Task',
        relatedId: task._id,
        actionUrl: '/planner'
      });
      
      // Emit socket event
      if (io) {
        io.to(`user:${task.user._id}`).emit('task_overdue', task);
      }
    }
    
    console.log(`⚠️ Processed ${overdueTasks.length} overdue tasks`);
  } catch (error) {
    console.error('Error checking overdue tasks:', error);
  }
};

/**
 * Update plant growth for all active plants
 */
const updatePlantGrowth = async () => {
  try {
    const plants = await Plant.find({ status: 'active' });
    
    for (const plant of plants) {
      const daysSincePlanting = Math.floor(
        (new Date() - plant.plantedDate) / (1000 * 60 * 60 * 24)
      );
      
      // Update growth data
      plant.daysGrowing = daysSincePlanting;
      
      // Determine growth stage
      if (daysSincePlanting < 7) {
        plant.growthStage = 'seedling';
      } else if (daysSincePlanting < 30) {
        plant.growthStage = 'vegetative';
      } else if (daysSincePlanting < 60) {
        plant.growthStage = 'flowering';
      } else {
        plant.growthStage = 'mature';
      }
      
      // Calculate growth percentage (0-100)
      const expectedMaturityDays = plant.expectedMaturityDays || 90;
      plant.growthProgress = Math.min((daysSincePlanting / expectedMaturityDays) * 100, 100);
      
      await plant.save();
    }
    
    console.log(`🌱 Updated growth for ${plants.length} plants`);
  } catch (error) {
    console.error('Error updating plant growth:', error);
  }
};

/**
 * Check plant health and create alerts
 */
const checkPlantHealth = async (io) => {
  try {
    const plants = await Plant.find({ status: 'active' }).populate('user');
    
    for (const plant of plants) {
      // Check if plant needs watering
      if (plant.lastWatered) {
        const daysSinceWatering = Math.floor(
          (new Date() - plant.lastWatered) / (1000 * 60 * 60 * 24)
        );
        
        const wateringFrequency = plant.careSchedule?.watering?.frequencyDays || 2;
        
        if (daysSinceWatering >= wateringFrequency) {
          await Notification.createNotification({
            user: plant.user._id,
            type: 'water_reminder',
            title: '💧 Time to Water',
            message: `${plant.name} needs watering`,
            icon: '💧',
            priority: 'high',
            relatedModel: 'Plant',
            relatedId: plant._id,
            actionUrl: `/garden/${plant._id}`
          });
          
          if (io) {
            io.to(`user:${plant.user._id}`).emit('water_reminder', plant);
          }
        }
      }
      
      // Check health score
      if (plant.health && plant.health.score < 50) {
        await Notification.createNotification({
          user: plant.user._id,
          type: 'plant_health_alert',
          title: '⚠️ Plant Health Alert',
          message: `${plant.name} health is ${plant.health.score}% - needs attention`,
          icon: '⚠️',
          priority: 'urgent',
          relatedModel: 'Plant',
          relatedId: plant._id,
          actionUrl: `/garden/${plant._id}`
        });
      }
    }
  } catch (error) {
    console.error('Error checking plant health:', error);
  }
};

/**
 * Generate daily watering schedule
 */
const generateWateringSchedule = async (userId) => {
  try {
    const plants = await Plant.find({
      user: userId,
      status: 'active'
    });
    
    const schedule = [];
    
    for (const plant of plants) {
      const wateringFrequency = plant.careSchedule?.watering?.frequencyDays || 2;
      const lastWatered = plant.lastWatered || plant.plantedDate;
      
      const daysSinceWatering = Math.floor(
        (new Date() - lastWatered) / (1000 * 60 * 60 * 24)
      );
      
      if (daysSinceWatering >= wateringFrequency) {
        schedule.push({
          plant: plant._id,
          name: plant.name,
          urgency: daysSinceWatering > wateringFrequency ? 'overdue' : 'due',
          daysOverdue: Math.max(0, daysSinceWatering - wateringFrequency)
        });
      }
    }
    
    return schedule;
  } catch (error) {
    console.error('Error generating watering schedule:', error);
    return [];
  }
};

module.exports = {
  checkOverdueTasks,
  updatePlantGrowth,
  checkPlantHealth,
  generateWateringSchedule
};
