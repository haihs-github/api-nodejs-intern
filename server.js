const http = require('http');

const router = require('./router');

const PORT = 3000;

// Bkav haihs: khởi tạo server - start
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    router(req, res);
});
// Bkav haihs: khởi tạo server - end

// Bkav haihs : lắng nghe và chạy server - start
server.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
    console.log(`Database lưu tại file tasks.json`);
});
// Bkav haihs : lắng nghe và chạy server - end

