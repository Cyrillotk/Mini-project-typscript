import {
  Response,
  NextFunction
} from "express";

import {
  AuthRequest
} from "../../middleware/authMiddleware";

import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} from "./task.service";

import { taskSchema } from "./task.validation";

const getAll = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  try {

    const tasks = await getTasks(
      req.user!.userId
    );

    res.json(tasks);

  } catch (error) {
    next(error);
  }
};

const getOne = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  try {

    const task = await getTask(
      req.params.id,
      req.user!.userId
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

const create = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  try {

    const data = taskSchema.parse(req.body);

    const task = await createTask(
      data.title,
      data.description,
      req.user!.userId
    );

    res.status(201).json({
      message: "Task created successfully",
      task
    });

  } catch (error) {
    next(error);
  }
};

const update = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  try {

    const data = taskSchema.partial().parse(
      req.body
    );

    const task = await updateTask(
      req.params.id,
      req.user!.userId,
      data
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json({
      message: "Task updated successfully",
      task
    });

  } catch (error) {
    next(error);
  }
};

const remove = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  try {

    const task = await deleteTask(
      req.params.id,
      req.user!.userId
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

export {
  getAll,
  getOne,
  create,
  update,
  remove
};