const app = require('./app');
const sequelize = require('./config/database');
const PORT = process.env.PORT || 3000;

// Khởi chạy hệ thống
const startServer = async () => {
    try {
        // Kết nối DB và đồng bộ Model
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        
        // Sync sẽ tự động tạo bảng nếu chưa có (không dùng { force: true } ở production)
        await sequelize.sync(); 
        
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

startServer();