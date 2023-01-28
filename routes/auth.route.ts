import { Router } from "express";
import {
  controllerUpdateUser,
  getLoggedInUser,
  isLoggedIn,
  login,
  register,
} from "../controller/auth.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();
router.post("/login", login);
router.put("/:id", verifyToken, controllerUpdateUser);
router.post("/register", register);
router.get("/verifyToken", isLoggedIn);
router.get("/me", verifyToken, getLoggedInUser);
module.exports = router;
