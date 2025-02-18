import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { isAdminOrEditor, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, isAdminOrEditor, updateTask);
router.delete("/:id", protect, isAdminOrEditor, deleteTask);

export default router;
