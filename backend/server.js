const app = require('./app');

const cloudinary = require('cloudinary');
const connectDatabase = require('./config/database');

// Handling Uncaught Exception (จัดการกับตัวแปรที่ไม่มีการระบุค่า null values)
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception!`);
  process.exit(1);
});

// config
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({ path: 'backend/config/config.env' });
}

// connectDB
connectDatabase();

// Upload profile
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// unhadled Promise Rejection (จัดการ promise no catce(err))
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection!`);
  server.close(() => {
    process.exit(1);
  });
});
