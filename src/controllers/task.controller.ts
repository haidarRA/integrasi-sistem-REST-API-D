import { Request, Response } from "express";
import { Task } from "../models/task.model";

export const addTask = async (req: Request, res: Response) => {
  try {
    const task = req.body;
    const { title, description } = task;

    const newTask = await Task.create({
      title,
      description,
    });

    res.status(201).json({
      status: "success",
      message: "Task added successfully",
      data: {
        task: newTask,
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: error.message.toString(),
    });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const data = await Task.find();
    res.status(201).json({
      status: "success",
      message: "Successfully get all tasks",
      data,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: error.message.toString(),
    });
  }
}

export const getTaskByID = async (req: Request, res: Response) => {
  try {
    const data = await Task.findById(req.params.id);

    const taskExists = await Task.findOne({
      _id: req.params.id,
    });

    if(!taskExists) {
      res.status(400).json({
        status: "error",
        message: `Task with id: ${req.params.id} not found`,
      });
      return;
    }

    res.status(201).json({
      status: "success",
      message: "Successfully get task",
      data,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: `Invalid task id: ${req.params.id}`,
    });
  }
}

export const deleteTaskByID = async (req: Request, res: Response) => {
  try {
    const data = await Task.findById(req.params.id);

    const deleteTask = await Task.findByIdAndDelete({
      _id: req.params.id,
    });

    if(!deleteTask) {
      res.status(404).json({
        status: "error",
        message: `Task with id: ${req.params.id} not found`,
      });
      return;
    }

    res.status(201).json({
      status: "success",
      message: "Successfully remove task",
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: `Invalid task id: ${req.params.id}`,
    });
  }
}

export const updateTaskByID = async (req: Request, res: Response) => {
  try {
    const taskID = req.params.id;
    const updateFields = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskID,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      res.status(400).json({
        status: "error",
        message: `Task with id: ${req.params.id} not found`,
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: `Invalid task id: ${req.params.id}`,
    });
  }
};