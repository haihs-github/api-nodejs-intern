const express = require('express');
const taskRoutes = require('./routes/task.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// BKAV HaiHS : Các middleware của hệ thống - start
app.use(express.json()) // Middleware để parse JSON request body

app.use('/tasks', taskRoutes); // Tách riêng URL base là /tasks

app.use(errorHandler); // Middleware xử lý lỗi tập trung
// BKAV HaiHS : Các middleware của hệ thống - end

module.exports = app;