// BKAV HaiHS : Middleware xử lý lỗi tập trung - start 
const errorHandler = (err, req, res, next) => {
    console.error(`[Error] ${err.message}`);

    // Bắt các lỗi đặc biệt từ Database (Sequelize)
    if (err.name === 'SequelizeDatabaseError') {
        return res.status(500).json({
            success: false,
            message: 'Database query error',
            error: err.message
        });
    }

    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Invalid data format',
            error: err.errors.map(e => e.message)
        });
    }

    // Lỗi mặc định
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
};
// BKAV HaiHS : Middleware xử lý lỗi tập trung - end 

module.exports = errorHandler;