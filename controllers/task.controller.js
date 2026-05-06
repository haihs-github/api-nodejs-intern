const taskRepository = require('../repositories/task.repository');

// BKAV HaiHS : hàm controller lấy tất cả task - start
const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await taskRepository.findAllTasks();
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        next(error); 
    }
};
// BKAV HaiHS : hàm controller lấy tất cả task - end

// BKAV HaiHS : hàm controller lấy task theo id - start
const getTaskById = async (req, res, next) => {
    try {
        const task = await taskRepository.findTaskById(req.params.id);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
};
// BKAV HaiHS : hàm controller lấy task theo id - end

// BKAV HaiHS : hàm controller tạo task mới - start
const createTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ success: false, message: 'Title is required' });
        }

        const { task, created } = await taskRepository.createTask(req.body);
        
        // Xử lý Idempotency: Nếu gửi request 2 lần với cùng title, trả về 200 OK thay vì 201 Created (tránh trùng lặp)
        if (!created) {
            return res.status(200).json({ success: true, message: 'Task already exists', data: task });
        }
        
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
};
// BKAV HaiHS : hàm controller tạo task mới - end

// BKAV HaiHS : hàm controller cập nhật task - start
const updateTask = async (req, res, next) => {
    try {
        const updatedTask = await taskRepository.updateTask(req.params.id, req.body);
        if (!updatedTask) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        // Idempotent: PUT luôn trả về kết quả trạng thái cuối cùng giống nhau dù gọi bao nhiêu lần
        res.status(200).json({ success: true, data: updatedTask });
    } catch (error) {
        next(error);
    }
};
// BKAV HaiHS : hàm controller cập nhật task - end

// BKAV HaiHS : hàm controller Xóa task - start
const deleteTask = async (req, res, next) => {
    try {
        const isDeleted = await taskRepository.deleteTask(req.params.id);
        if (!isDeleted) {
            // REST Idempotency: Xóa 1 resource không tồn tại vẫn có thể trả về 204 hoặc 404. Ta chọn 404 cho rõ ràng.
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(204).send(); // 204 No Content
    } catch (error) {
        next(error);
    }
};
// BKAV HaiHS : hàm controller Xóa task - start

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};