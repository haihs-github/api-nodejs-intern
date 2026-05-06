const Task = require('../models/task.model');

// BKAV HaiHS : Lấy danh sách toàn bộ Task từ Database - start
const findAllTasks = async () => {
    return await Task.findAll();
};
// BKAV HaiHS : Lấy danh sách toàn bộ Task từ Database - end

// BKAV HaiHS : Tìm kiếm một Task cụ thể theo id - start
const findTaskById = async (id) => {
    return await Task.findByPk(id);
};
// BKAV HaiHS : Tìm kiếm một Task cụ thể theo id - end

// BKAV HaiHS : Tạo mới một Task vào database - start
const createTask = async (data) => {
    const [task, created] = await Task.findOrCreate({
        where: { title: data.title },
        defaults: {
            description: data.description,
            completed: data.completed
        }
    });
    return { task, created }; 
};
// BKAV HaiHS : Tạo mới một Task vào database (có kiểm tra trùng lặp) - end

// BKAV HaiHS : Cập nhật thông tin của một Task đã tồn tại - start
const updateTask = async (id, updateData) => {
    const task = await Task.findByPk(id);
    if (!task) return null;
    
    return await task.update(updateData);
};
// BKAV HaiHS : Cập nhật thông tin của một Task đã tồn tại - end

// BKAV HaiHS : Xóa một Task khỏi database - start
const deleteTask = async (id) => {
    const task = await Task.findByPk(id);
    if (!task) return null;
    
    await task.destroy();
    return true;
};
// BKAV HaiHS : Xóa một Task khỏi database - end

module.exports = {
    findAllTasks,
    findTaskById,
    createTask,
    updateTask,
    deleteTask
};