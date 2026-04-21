const {readDB, writeDB} = require('../services/taskService.js')

// Lấy danh sách toàn bộ task (GET /tasks)
const getAllTask = async (res) => {
    const tasks = await readDB()
    res.writeHead(200)
    res.end(JSON.stringify(tasks))

}

// Lấy chi tiết một task theo ID (GET /tasks/:id)
const getTaskById = async (res, id) => {
    const tasks = await readDB()
    const task = tasks.find(t => t.id === id)

    if(!task){
        res.writeHead(404)
        res.end(JSON.stringify({message: 'khong tim thay task'}))
    }

    res.writeHead(200)
    res.end(JSON.stringify(task))
}

// Tạo task mới (POST /tasks)

const createNewTask = async (res, body) => {

    if(!body.title){
        res.writeHead(400)
        res.end(JSON.stringify({message: 'thieu title la truong bat buoc'}))
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

// Cập nhật task (PUT /tasks/:id)

const updateTask = async (res, id, body) => {
    const tasks = await readDB()
    const taskIndex = tasks.findIndex(t => t.id === id)
    
    if(taskIndex === -1){
        res.writeHead(404)
        res.end(JSON.stringify({message: "khong tim thay task can sua"}))
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

// xoa task (DELETE /task/:id)

const deleteTask = async ( res, id) => {
    const tasks = await readDB()
    const taskIndex = tasks.findIndex(t => t.id === id )

    if(taskIndex === -1){
        res.writeHead(404)
        res.end(JSON.stringify({message: "khong tim thay task"}))
    }

    tasks.splice(taskIndex, 1)
    await writeDB(tasks)

    res.writeHead(200)
    res.end(JSON.stringify({message : "da xoa thanh cong"}))
}

module.exports={getAllTask, getTaskById, createNewTask, updateTask, deleteTask}