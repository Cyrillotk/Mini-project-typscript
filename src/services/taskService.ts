import Task from "../models/Task";

export const createTask = async (
  title: string,
  description: string,
  userId: string
) => {
  return Task.create({
    title,
    description,
    user: userId
  });
};

export const getTasks = async (userId: string) => {
  return Task.find({ user: userId }).sort({ createdAt: -1 });
};

export const getTask = async (taskId: string, userId: string) => {
  return Task.findOne({
    _id: taskId,
    user: userId
  });
};

export const updateTask = async (
  taskId: string,
  userId: string,
  data: {
    title?: string;
    description?: string;
    completed?: boolean;
  }
) => {
  return Task.findOneAndUpdate(
    {
      _id: taskId,
      user: userId
    },
    data,
    {
      new: true,
      runValidators: true
    }
  );
};

export const deleteTask = async (
  taskId: string,
  userId: string
) => {
  return Task.findOneAndDelete({
    _id: taskId,
    user: userId
  });
};