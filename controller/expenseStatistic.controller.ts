import { Request, Response } from "express";
import { getAuthenticatedUserFromToken } from "../service/auth.service";
import { getExpenseStatistic } from "../service/expenseStatistc.service";

export const controllerGetExpenseStatistic = async (
  req: Request,
  res: Response
) => {
  const user = getAuthenticatedUserFromToken(
    req.headers.authorization as string
  );
  const createdExpense = await getExpenseStatistic(user as any);
  if (createdExpense instanceof Error) {
    res.status(400).json({ message: createdExpense.message });
  }
  res.status(200).json(createdExpense);
};
