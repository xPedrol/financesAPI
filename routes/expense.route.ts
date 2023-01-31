import { Router } from "express";
import {
  controllerCreateExpense,
  controllerGetExpense,
  controllerGetExpenses,
  controllerUpdateExpense,
  controllerDeleteExpense,
  controllerGetExpenseCount,
} from "../controller/expense.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();
router.post("/create", verifyToken, controllerCreateExpense);
router.get("/count", controllerGetExpenseCount);
router.get("/:id", verifyToken, controllerGetExpense);
router.get("/", verifyToken, controllerGetExpenses);
router.put("/:id", verifyToken, controllerUpdateExpense);
router.delete("/:id", verifyToken, controllerDeleteExpense);

module.exports = router;
