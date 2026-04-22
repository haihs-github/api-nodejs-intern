const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path')

const dbPath = path.join(__dirname, '..', 'task.json')

// bkav haihs : hàm đọc dữ liệu từ file task.json - start 
const readDB = () => {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(dbPath, { encoding: 'utf8' });
        let data = '';

        stream.on('data', (chunk) => {
            data += chunk;
        });

        stream.on('end', () => {
            try {
                if (!data) return resolve([]); 
                const jsonData = JSON.parse(data);
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        });

        stream.on('error', (error) => {
            console.error('Có lỗi khi đọc file database qua stream: ', error);
            reject(error);
        });
    });
};
// bkav haihs : hàm đọc dữ liệu từ file task.json - start 

// bkav haihs : hàm ghi dữ liệu từ file task.json - start 
const writeDB = async (data) => {
   const jsonData = JSON.stringify(data, null, 2);
    await fsPromises.writeFile(dbPath, jsonData, 'utf8');
}
// bkav haihs : hàm ghi dữ liệu từ file task.json - end 

module.exports = {
    readDB,
    writeDB
}