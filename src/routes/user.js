import { Router } from "express";
import {
  deleteUser,
  getUsers,
  Login,
  Register,
  updateUser,
} from "../controllers/user.js";
import { authenticate, isAdmin } from "../middleware/authenticate.js";
export const userRoute = Router();
userRoute.post("/login", Login);
userRoute.post("/", Register);
userRoute.get("/", authenticate, isAdmin, getUsers);
userRoute.put("/:id", authenticate, isAdmin, updateUser);
userRoute.delete("/:id", authenticate, isAdmin, deleteUser);
