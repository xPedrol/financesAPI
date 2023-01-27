import { Router } from "express";
import {
  controllerCreateGoal,
  controllerGetGoal,
  controllerGetGoals,
  controllerUpdateGoal,
  controllerDeleteGoal,
  controllerGetGoalByDate,
} from "../controller/goal.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();
router.post("/create", verifyToken, controllerCreateGoal);
router.get("/date", verifyToken, controllerGetGoalByDate);
router.get("/:id", verifyToken, controllerGetGoal);
router.get("/", verifyToken, controllerGetGoals);
router.put("/:id", verifyToken, controllerUpdateGoal);
router.delete("/:id", verifyToken, controllerDeleteGoal);

module.exports = router;
