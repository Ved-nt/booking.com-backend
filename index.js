import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";  // Fixing import

dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));  // Apply CORS properly

// MongoDB Connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);  // Exit process on failure
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("❌ MongoDB disconnected");
});


// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// Global Error Handler
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    console.error("❌ Error:", err);
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

// Start server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    connect();
    console.log(`🚀 Backend server running on port ${PORT}`);
});
