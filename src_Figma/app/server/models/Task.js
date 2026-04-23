const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant'
  },
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['water', 'fertilize', 'prune', 'repot', 'harvest', 'pest_check', 'custom'],
    default: 'custom'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'cancelled', 'overdue'],
    default: 'pending'
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  dueTime: {
    type: String // Format: "HH:MM"
  },
  completedAt: {
    type: Date
  },
  recurring: {
    enabled: {
      type: Boolean,
      default: false
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'biweekly', 'monthly'],
      default: 'weekly'
    },
    nextOccurrence: {
      type: Date
    }
  },
  reminder: {
    enabled: {
      type: Boolean,
      default: true
    },
    time: {
      type: Number, // Minutes before due time
      default: 30
    },
    sent: {
      type: Boolean,
      default: false
    }
  },
  notes: {
    type: String
  },
  attachments: [{
    url: String,
    type: String, // 'image', 'document'
    uploadedAt: Date
  }]
}, {
  timestamps: true
});

// Index for efficient queries
taskSchema.index({ user: 1, dueDate: 1 });
taskSchema.index({ user: 1, status: 1 });
taskSchema.index({ user: 1, plant: 1 });

// Virtual for checking if task is overdue
taskSchema.virtual('isOverdue').get(function() {
  return this.status === 'pending' && this.dueDate < new Date();
});

// Update status to overdue if past due date
taskSchema.pre('save', function(next) {
  if (this.status === 'pending' && this.dueDate < new Date()) {
    this.status = 'overdue';
  }
  next();
});

// Mark task as completed
taskSchema.methods.complete = function() {
  this.status = 'completed';
  this.completedAt = new Date();
  
  // If recurring, create next occurrence
  if (this.recurring.enabled) {
    this.createNextOccurrence();
  }
  
  return this.save();
};

// Create next occurrence for recurring tasks
taskSchema.methods.createNextOccurrence = async function() {
  const Task = this.constructor;
  
  let nextDate = new Date(this.dueDate);
  
  switch (this.recurring.frequency) {
    case 'daily':
      nextDate.setDate(nextDate.getDate() + 1);
      break;
    case 'weekly':
      nextDate.setDate(nextDate.getDate() + 7);
      break;
    case 'biweekly':
      nextDate.setDate(nextDate.getDate() + 14);
      break;
    case 'monthly':
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
  }
  
  const newTask = new Task({
    user: this.user,
    plant: this.plant,
    title: this.title,
    description: this.description,
    type: this.type,
    priority: this.priority,
    dueDate: nextDate,
    dueTime: this.dueTime,
    recurring: this.recurring,
    reminder: this.reminder,
    notes: this.notes
  });
  
  await newTask.save();
  return newTask;
};

module.exports = mongoose.model('Task', taskSchema);
