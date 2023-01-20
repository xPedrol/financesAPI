import { Router } from "express";
import {
  getLoggedInUser,
  isLoggedIn,
  login,
  register,
} from "../controller/auth.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();
router.post("/login", login);
router.post("/register", register);
router.get("/verifyToken", isLoggedIn);
router.get("/me", verifyToken, getLoggedInUser);
module.exports = router;
