import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} from "../services/taskService";

export const create = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await createTask(
      req.body.title,
      req.body.description,
      req.user!.id
    );

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await getTasks(req.user!.id);

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await getTask(
      req.params.id,
      req.user!.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await updateTask(
      req.params.id,
      req.user!.id,
      req.body
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await deleteTask(
      req.params.id,
      req.user!.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};