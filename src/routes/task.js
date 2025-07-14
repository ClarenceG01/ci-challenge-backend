import { Router } from "express";
import { authenticate, isAdmin } from "../middleware/authenticate.js";
import { addTask, getTasks, getUserTasks, updateStatus } from "../controllers/task.js";
export const taskRoute = Router();
taskRoute.post("/", authenticate, isAdmin, addTask);
taskRoute.get("/", authenticate, isAdmin, getTasks);
taskRoute.get("/:username", authenticate, getUserTasks);
taskRoute.put("/:id", authenticate, updateStatus);
