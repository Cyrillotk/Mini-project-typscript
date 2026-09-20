import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit"; 
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import authRoutes from "./modules/auth/auth.routes";
import taskRoutes from "./modules/tasks/task.routes";
import { errorHandler } from "./middleware/errorMiddleware";
import { notFound } from "./middleware/notFoundMiddleware";
dotenv.config();

const app = express();

app.use(cors());
//for next task securing the api
app.use(helmet());  

app.use(express.json());

connectDB();

app.get("/", (_req, res) => {
  res.json({
    message: "Task Management API is running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});