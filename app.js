const express = require('express');
const taskRoutes = require('./routes/task.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Middleware thông thường: Parse Body JSON (Thay thế logic Buffer khó nhằn ở bài cũ)
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Router
app.use('/tasks', taskRoutes); // Tách riêng URL base là /tasks

// Middleware đặc biệt xử lý lỗi tập trung (PHẢI NẰM CUỐI CÙNG)
app.use(errorHandler);

module.exports = app;