import express from "express";

import {
  signin,
  signup,
  googleSignup,
  getUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/googlesignup", googleSignup);
router.get("/", getUsers);
router.patch("/:id", updateUser);
router.get("/:id", getUser);

export default router;
