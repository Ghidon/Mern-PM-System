import express from "express";

import {
  getProjects,
  createProject,
  updateProject,
  getProject,
  deleteProject,
} from "../controllers/projects.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/", auth, createProject);
router.patch("/:id", auth, updateProject);
router.get("/:id", auth, getProject);
router.delete("/:id", auth, deleteProject);

export default router;
