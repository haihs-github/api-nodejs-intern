const taskController = require('./controllers/taskController.js')

const parseBody = (req) => {
    return new Promise((resolve, reject) => {
        let bodyChunks = []; 

        req.on('data', (chunk) => {
            bodyChunks.push(chunk);
        });

        req.on('end', () => {
            if (bodyChunks.length === 0) {
                return resolve(null);
            }
            try {
                // Ghép nối các mảnh lại và dịch sang object JSON
                const parsedBody = Buffer.concat(bodyChunks).toString();
                resolve(JSON.parse(parsedBody));
            } catch (error) {
                reject(error);
            }
        });

        req.on('error', (err) => reject(err));
    });
};

const routes = async (req, res) => {
    const {method, url} = req
    const urlParts = url.split('/')
    const resource = urlParts[1]
    const id = urlParts[2]

    if(!resource){
        res.writeHead(404)
        res.end(JSON.stringify({message: "duong dan khong ton tai"}))
        return
    }

    try{
        if(method === "GET" && !id){
            await taskController.getAllTask(res);

        }else if(method === "GET" && id){
            await taskController.getTaskById(res,id)
        }else if(method === "POST"){
            const body = await parseBody(req);
            await taskController.createNewTask(res, body);
        }else if(method === 'PUT' && id) {
            const body = await parseBody(req);
            await taskController.updateTask(res, id, body);
            console.log('da chay router')    
        }else if(method === "DELETE"){
            await taskController.deleteTask(res, id)
        }else {
            res.writeHead(405); 
            res.end(JSON.stringify({ message: "Phương thức HTTP không được hỗ trợ" }));
        }
    }catch (error) {
        res.writeHead(400); 
        res.end(JSON.stringify({ message: "Yêu cầu không hợp lệ hoặc dữ liệu lỗi" }));
    }
}

module.exports = routes