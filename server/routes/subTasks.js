import express from "express";

import {
  getSubTasks,
  createSubTask,
  updateSubTask,
  getSubTask,
  deleteSubTask,
} from "../controllers/subTasks.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getSubTasks);
router.post("/", createSubTask);
router.patch("/:id", auth, updateSubTask);
router.get("/:id", auth, getSubTask);
router.delete("/:id", auth, deleteSubTask);

export default router;
