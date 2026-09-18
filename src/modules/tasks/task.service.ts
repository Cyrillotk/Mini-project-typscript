import Task from "./task.model";

const getTasks = async (userId: string) => {

  return Task.find({
    userId
  }).sort({
    createdAt: -1
  });
};

const getTask = async (
  taskId: string,
  userId: string
) => {

  return Task.findOne({
    _id: taskId,
    userId
  });
};

const createTask = async (
  title: string,
  description: string,
  userId: string
) => {

  return Task.create({
    title,
    description,
    userId
  });
};

const updateTask = async (
  taskId: string,
  userId: string,
  data: Record<string, unknown>
) => {

  return Task.findOneAndUpdate(
    {
      _id: taskId,
      userId
    },
    data,
    {
      new: true,
      runValidators: true
    }
  );
};

const deleteTask = async (
  taskId: string,
  userId: string
) => {

  return Task.findOneAndDelete({
    _id: taskId,
    userId
  });
};

export {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};