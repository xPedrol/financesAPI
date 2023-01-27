import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import {
  controllerGetExpensesByMonth,
  controllerGetExpenseStatistic,
} from "../controller/expenseStatistic.controller";

const router = Router();
router.get("/", verifyToken, controllerGetExpenseStatistic);
router.get("/monthsBalance", verifyToken, controllerGetExpensesByMonth);
module.exports = router;
