import { Request, Response } from "express";
import { getAuthenticatedUserFromToken } from "../service/auth.service";
import {
  getExpensesByMonth,
  getExpenseStatistic,
} from "../service/expenseStatistc.service";
import { IUser } from "../model/User.model";
import dayjs from "dayjs";

export const controllerGetExpenseStatistic = async (
  req: Request,
  res: Response
) => {
  const user = getAuthenticatedUserFromToken(
    req.headers.authorization as string
  );
  if (req.query.date === undefined) {
    req.query.date = `${dayjs().month() + 1}-01-${dayjs().year()}`;
  }
  const createdExpense = await getExpenseStatistic(
    user as any,
    req.query.date as string
  );
  if (createdExpense instanceof Error) {
    res.status(400).json({ message: createdExpense.message });
  }
  res.status(200).json(createdExpense);
};

export const controllerGetExpensesByMonth = async (
  req: Request,
  res: Response
) => {
  const user = getAuthenticatedUserFromToken(
    req.headers.authorization as string
  ) as IUser;
  const monthsBalance = await getExpensesByMonth(user);
  if (monthsBalance instanceof Error) {
    res.status(500).json(monthsBalance.message);
  }
  res.status(200).json(monthsBalance);
};
