const taskController = require('./controllers/taskController.js');
const MAX_PAYLOAD_SIZE = 5 * 1024 * 1024;
const AppError = require('./AppError.js')
// bkav haihs : phân tích req body thành json - start
const parseBody = (req) => {
    return new Promise((resolve, reject) => {
        let bodyChunks = []; 
        let totalBytes = 0; 

        req.on('data', (chunk) => {
            totalBytes += chunk.length;

            if (totalBytes > MAX_PAYLOAD_SIZE) {
                req.destroy(); 
                return reject(new AppError(413, "Dữ liệu gửi lên quá lớn (Payload Too Large)"));
            }
            bodyChunks.push(chunk);
        });

        req.on('end', () => {
            if (bodyChunks.length === 0) return resolve(null);
            try {
                const parsedBody = Buffer.concat(bodyChunks).toString();
                resolve(JSON.parse(parsedBody));
            } catch (error) {
                reject(new AppError(400, "Định dạng JSON không hợp lệ"));
            }
        });

        req.on('error', (err) => reject(err));
    });
};
// bkav haihs : phân tích req body thành json - end

// bkav haihs : định nghĩa các route và gọi controller tương ứng - start
const routes = async (req, res) => {
    const {method, url} = req
    const urlParts = url.split('/')
    const resource = urlParts[1]
    const id = urlParts[2]

    if (!resource) {
        res.writeHead(404);
        return res.end(JSON.stringify({message: "Đường dẫn không tồn tại"}));
    }

    try{
        if (method === "GET" && !id) {
            await taskController.getAllTask(res);

        } 
        else if (method === "GET" && id) {
            await taskController.getTaskById(res,id)
        }
        else if (method === "POST"){
            const body = await parseBody(req);
            await taskController.createNewTask(res, body);
        }
        else if (method === 'PUT' && id) {
            const body = await parseBody(req);
            await taskController.updateTask(res, id, body);
            console.log('da chay router')    
        } 
        else if(method === "DELETE") {
            await taskController.deleteTask(res, id)
        }
        else {
            res.writeHead(405); 
            res.end(JSON.stringify({ message: "Phương thức HTTP không được hỗ trợ" }));
        }
    } catch (error) {
        console.error(`[ERROR]: ${error.message} \nStack: ${error.stack}`);

        const statusCode = error.statusCode || 500;
        const message = error.statusCode ? error.message : "Lỗi hệ thống nội bộ Server";

        if (!res.headersSent) {
            res.writeHead(statusCode, { 'Content-Type': 'application/json' }); 
            res.end(JSON.stringify({ 
                success: false, 
                message: message 
            }));
        }
    }
}
// bkav haihs : định nghĩa các route và gọi controller tương ứng - end

module.exports = routes;