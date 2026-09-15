import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler } from "./middleware/errorMiddleware";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.get("/", (_req, res) => {
  res.json({
    message: "Task Management API is running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});