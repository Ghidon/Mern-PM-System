import express from "express";

import { getSubTasks, createSubTask } from "../controllers/subTasks.js";

const router = express.Router();

router.get("/", getSubTasks);
router.post("/", createSubTask);

export default router;
