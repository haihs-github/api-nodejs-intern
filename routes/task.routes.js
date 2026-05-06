const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// BKAV HaiHS : Định nghĩa các route cho Task - start
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
// BKAV HaiHS : Định nghĩa các route cho Task - start

module.exports = router;