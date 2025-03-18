// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/React", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Đã kết nối với MongoBD");
  } catch (error) {
    console.error("Lỗi khi kết nối mongoDB:", error);
    process.exit(1);
  }
};
mongoose.connection.on("connected", () => {
  console.log(`Đã kết nối đến database: ${mongoose.connection.db.databaseName}`);
});

mongoose.connection.on("error", (err) => {
  console.error("Lỗi kết nối đến database:", err);
});

module.exports = connectDB;
