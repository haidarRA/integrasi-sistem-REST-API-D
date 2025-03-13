import { Router } from "express";

export const taskRouter = Router();

import { addTask, getAllTasks, getTaskByID, deleteTaskByID, updateTaskByID } from "../controllers/task.controller";

taskRouter.post("/", addTask);
taskRouter.get("/",  getAllTasks);
taskRouter.get("/:id",  getTaskByID);
taskRouter.delete("/:id", deleteTaskByID);
taskRouter.patch("/:id", updateTaskByID);