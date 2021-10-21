import express from "express";

import {
  getTasks,
  createTask,
  updateTask,
  getTask,
  deleteTask,
} from "../controllers/tasks.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.get("/:id", getTask);
router.delete("/:id", deleteTask);

export default router;
