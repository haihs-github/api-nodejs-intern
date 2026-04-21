const fs = require('fs').promises;
const path = require('path')

const dbPath = path.join(__dirname, '..', 'task.json')

//hàm đọc dữ liệu từ db
const readDB = async () =>{
    try{
        const data = await fs.readFile(dbPath, 'utf8')

        return JSON.parse(data)
    }catch(error){
        console.error('Có lỗi khi đọc file database: ', error)
        return []
    }
}

// hàm ghi dữ liệu vào db
const writeDB = async (data) => {
    try{
        const jsonData = JSON.stringify(data, null, 2)

        await fs.writeFile(dbPath, jsonData, 'utf8')
    }catch(error){
        console.error("lỗi khi ghi file database",error)
    }
}

module.exports = {
    readDB,
    writeDB
}