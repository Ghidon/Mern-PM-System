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
// router.post("/googlesignup", googleSignup);
router.get("/", auth, getUsers);
router.patch("/:id", auth, updateUser);
router.get("/:id", auth, getUser);

export default router;
