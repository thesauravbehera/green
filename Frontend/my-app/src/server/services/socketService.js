const Task = require('../models/Task');
const Notification = require('../models/Notification');

/**
 * Initialize Socket.IO handlers
 */
const initializeSocketIO = (io) => {
  io.on('connection', (socket) => {
    console.log(`✅ User connected: ${socket.id}`);
    
    // Join user's personal room
    socket.on('join', (userId) => {
      socket.join(`user:${userId}`);
      console.log(`User ${userId} joined their room`);
    });
    
    // Join community room
    socket.on('join_community', () => {
      socket.join('community');
      console.log(`User joined community room`);
    });
    
    // Handle typing indicator
    socket.on('typing', (data) => {
      socket.to('community').emit('user_typing', {
        userId: data.userId,
        userName: data.userName
      });
    });
    
    // Handle stop typing
    socket.on('stop_typing', (data) => {
      socket.to('community').emit('user_stop_typing', {
        userId: data.userId
      });
    });
    
    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });
};

/**
 * Emit notification to specific user
 */
const emitNotification = (io, userId, notification) => {
  io.to(`user:${userId}`).emit('notification', notification);
};

/**
 * Emit task reminder to specific user
 */
const emitTaskReminder = (io, userId, task) => {
  io.to(`user:${userId}`).emit('task_reminder', task);
};

/**
 * Emit community event to all users in community room
 */
const emitCommunityEvent = (io, eventType, data) => {
  io.to('community').emit(eventType, data);
};

module.exports = {
  initializeSocketIO,
  emitNotification,
  emitTaskReminder,
  emitCommunityEvent
};
