import express from "express";

import {
  getTasks,
  createTask,
  updateTask,
  getTask,
  deleteTask,
} from "../controllers/tasks.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getTasks);
router.post("/", auth, createTask);
router.patch("/:id", auth, updateTask);
router.get("/:id", auth, getTask);
router.delete("/:id", auth, deleteTask);

export default router;
