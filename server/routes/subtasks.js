const express = require('express');
const Subtask = require('../models/Subtask');
const Task = require('../models/Task');
const { body, validationResult } = require('express-validator');
const protect = require('../middleware/auth');

const router = express.Router();

// All subtask routes are protected
router.use(protect);

// @desc    Get all subtasks for a task
// @route   GET /api/subtasks/task/:taskId
// @access  Private
router.get('/task/:taskId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

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
        message: 'Not authorized to access this task',
      });
    }

    const subtasks = await Subtask.find({ task: req.params.taskId }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      data: subtasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});

// @desc    Create a new subtask
// @route   POST /api/subtasks
// @access  Private
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('task').notEmpty().withMessage('Task ID is required'),
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

      const { title, task } = req.body;

      // Verify task exists and user owns it
      const taskDoc = await Task.findById(task);
      if (!taskDoc) {
        return res.status(404).json({
          success: false,
          message: 'Task not found',
        });
      }

      if (taskDoc.user.toString() !== req.user.id) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized to add subtasks to this task',
        });
      }

      const subtask = await Subtask.create({
        title,
        task,
        user: req.user.id,
      });

      res.status(201).json({
        success: true,
        data: subtask,
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

// @desc    Update a subtask
// @route   PUT /api/subtasks/:id
// @access  Private
router.put(
  '/:id',
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('completed').optional().isBoolean().withMessage('Completed must be boolean'),
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

      let subtask = await Subtask.findById(req.params.id);

      if (!subtask) {
        return res.status(404).json({
          success: false,
          message: 'Subtask not found',
        });
      }

      // Make sure user owns the subtask
      if (subtask.user.toString() !== req.user.id) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized to update this subtask',
        });
      }

      subtask = await Subtask.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        success: true,
        data: subtask,
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

// @desc    Delete a subtask
// @route   DELETE /api/subtasks/:id
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const subtask = await Subtask.findById(req.params.id);

    if (!subtask) {
      return res.status(404).json({
        success: false,
        message: 'Subtask not found',
      });
    }

    // Make sure user owns the subtask
    if (subtask.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this subtask',
      });
    }

    await subtask.deleteOne();

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
