// index.js
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const apiRoutes = require("./routes/apiRoutes"); 

const app = express();

// Kết nối với MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Sử dụng API Routes
app.use("/api", apiRoutes);

const PORT = 3500;
app.listen(PORT, () => console.log(`Server đang chạy với cổng ${PORT}`));
