const express = require('express');
const Task = require('../models/Task');
const { body, validationResult } = require('express-validator');
const protect = require('../middleware/auth');

const router = express.Router();

// All task routes are protected
router.use(protect);

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { status, priority, sort } = req.query;
    
    // Build query
    let query = { user: req.user.id };
    
    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }
    
    // Filter by priority
    if (priority && priority !== 'all') {
      query.priority = priority;
    }
    
    // Sort options
    let sortOptions = {};
    if (sort === 'dueDate') {
      sortOptions.dueDate = 1;
    } else if (sort === '-dueDate') {
      sortOptions.dueDate = -1;
    } else if (sort === 'createdAt') {
      sortOptions.createdAt = -1;
    } else {
      sortOptions.createdAt = -1; // Default sort
    }
    
    const tasks = await Task.find(query).sort(sortOptions);
    
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional(),
    body('dueDate').isISO8601().withMessage('Valid due date is required'),
    body('priority').isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority'),
    body('status').isIn(['To-Do', 'In Progress', 'Completed']).withMessage('Invalid status'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array(),
        });
      }

      const { title, description, dueDate, priority, status } = req.body;

      const task = await Task.create({
        title,
        description,
        dueDate,
        priority,
        status,
        user: req.user.id,
      });

      res.status(201).json({
        success: true,
        data: task,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message,
      });
    }
  }
);

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
router.put(
  '/:id',
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional(),
    body('dueDate').optional().isISO8601().withMessage('Valid due date is required'),
    body('priority').optional().isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority'),
    body('status').optional().isIn(['To-Do', 'In Progress', 'Completed']).withMessage('Invalid status'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array(),
        });
      }

      let task = await Task.findById(req.params.id);

      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found',
        });
      }

      // Make sure user owns the task
      if (task.user.toString() !== req.user.id) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized to update this task',
        });
      }

      task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message,
      });
    }
  }
);

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Make sure user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this task',
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});

module.exports = router;
