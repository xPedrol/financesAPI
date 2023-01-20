import { Router } from "express";
import {
  controllerCreateExpense,
  controllerGetExpense,
  controllerGetExpenses,
  controllerUpdateExpense,
  controllerDeleteExpense,
} from "../controller/expense.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { controllerGetExpenseStatistic } from "../controller/expenseStatistic.controller";

const router = Router();
router.get("/", verifyToken, controllerGetExpenseStatistic);

module.exports = router;
