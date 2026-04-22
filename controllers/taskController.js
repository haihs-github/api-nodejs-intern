const {readDB, writeDB} = require('../services/taskService.js')
const AppError = require('../AppError.js')

// bkav haihs : hàm lấy danh sách tất cả các task - start
const getAllTask = async (res) => {
    const tasks = await readDB()
    res.writeHead(200)
    res.end(JSON.stringify(tasks))
}
// bkav haihs : hàm lấy danh sách tất cả các task - end

// bkav haihs : hàm lấy chi tiết một task theo ID - start
const getTaskById = async (res, id) => {
    const tasks = await readDB()
    const task = tasks.find(t => t.id === id)

    if (!task) {
        throw new AppError(404, "không tìm thấy task")
    }

    res.writeHead(200)
    res.end(JSON.stringify(task))
}
// bkav haihs : hàm lấy chi tiết một task theo ID - end

// bkav haihs : hàm tạo một task mới - start
const createNewTask = async (res, body) => {

    if (!body.title) {
        throw new AppError(400, 'Thiếu title - trường bắt buộc');
    }

    const tasks = await readDB()

    const newTask = {
        id: Date.now().toString(),
        title: body.title,
        description: body.description || "",
        completed: false
    }

    tasks.push(newTask)
    await writeDB(tasks)

    res.writeHead(201)
    res.end(JSON.stringify(newTask))
}
// bkav haihs : hàm tạo một task mới - end

// bkav haihs : hàm cập nhât một task - start
const updateTask = async (res, id, body) => {
    const tasks = await readDB()
    const taskIndex = tasks.findIndex(t => t.id === id)
    
    if (taskIndex === -1) {
        throw new AppError(404, 'Không tìm thấy task');
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: body.title !== undefined ? body.title : tasks[taskIndex].title,
        description: body.description !== undefined ? body.description : tasks[taskIndex].description,
        completed: body.completed !== undefined ? body.completed : tasks[taskIndex].completed
    }

    await writeDB(tasks)

    res.writeHead(200)
    res.end(JSON.stringify(tasks[taskIndex]))
}
// bkav haihs : hàm cập nhât một task - end

// bkav haihs : hàm xóa một task - start
const deleteTask = async (res, id) => {
    const tasks = await readDB()
    const taskIndex = tasks.findIndex(t => t.id === id )

    if (taskIndex === -1) {
        throw new AppError(404, 'Không tìm thấy task');
    }

    tasks.splice(taskIndex, 1)
    await writeDB(tasks)

    res.writeHead(200)
    res.end(JSON.stringify({message : "đã xóa thành công"}))
}
// bkav haihs : hàm xóa một task - end

module.exports = {
    getAllTask, 
    getTaskById, 
    createNewTask, 
    updateTask, 
    deleteTask
}