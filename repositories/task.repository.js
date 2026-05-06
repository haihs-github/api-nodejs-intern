const Task = require('../models/task.model');

class TaskRepository {
    async findAllTasks() {
        return await Task.findAll();
    }

    async findTaskById(id) {
        return await Task.findByPk(id);
    }

    async createTask(data) {
        // Đảm bảo Idempotency cho việc tạo: Kiểm tra xem title đã tồn tại chưa
        const [task, created] = await Task.findOrCreate({
            where: { title: data.title },
            defaults: {
                description: data.description,
                completed: data.completed
            }
        });
        return { task, created }; 
    }

    async updateTask(id, updateData) {
        const task = await Task.findByPk(id);
        if (!task) return null;
        
        // Idempotency: Cập nhật nhiều lần cùng 1 data vẫn cho ra cùng 1 kết quả
        return await task.update(updateData);
    }

    async deleteTask(id) {
        const task = await Task.findByPk(id);
        if (!task) return null;
        
        await task.destroy();
        return true;
    }
}

module.exports = new TaskRepository();