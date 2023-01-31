import prismaClient from "../config/prismaConfig";
import { IUser } from "../model/User.model";
import dayjs from "dayjs";
import { IExpensesByMonth } from "../model/ExpensesByMonth.model";
import { formatDate } from "../utils/formatDate.utils";

export const getExpenseStatistic = async (
  user: IUser,
  date: string,
  unit: "year" | "month" = "month"
) => {
  try {
    const expenseGainSum = await prismaClient.expense.aggregate({
      where: {
        date: {
          gte: dayjs(date).startOf(unit).toDate(),
          lte: dayjs(date).endOf(unit).toDate(),
        },
        userId: user.id,
        amount: {
          gt: 0,
        },
      },
      _sum: {
        amount: true,
      },
    });
    const expenseLossSum = await prismaClient.expense.aggregate({
      where: {
        date: {
          gte: dayjs(date).startOf(unit).toDate(),
          lte: dayjs(date).endOf(unit).toDate(),
        },
        userId: user.id,
        amount: {
          lt: 0,
        },
      },
      _sum: {
        amount: true,
      },
    });

    return {
      gains: expenseGainSum._sum.amount,
      losses: expenseLossSum._sum.amount,
    };
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const getExpensesByMonth = async (
  user: IUser
): Promise<IExpensesByMonth[] | Error> => {
  try {
    const expensesByMonth = await prismaClient.$queryRaw<
      IExpensesByMonth[]
    >`SELECT DATE_FORMAT(date,'%m/%Y') as date,SUM(amount) as amount FROM Expense
       WHERE userId = ${user.id} GROUP BY DATE_FORMAT(date,'%m/%Y')  ORDER BY date ASC`;
    if (Array.isArray(expensesByMonth)) {
      for (let i = 0; i < expensesByMonth.length; i++) {
        const expenseByMonth = expensesByMonth[i];
        if (expenseByMonth) {
          let gainsAndLosses = await getExpenseStatistic(
            user,
            formatDate(expenseByMonth.date)
          );

          if (gainsAndLosses instanceof Error || !gainsAndLosses) {
            gainsAndLosses = {
              gains: 0,
              losses: 0,
            };
          } else {
            gainsAndLosses.gains = gainsAndLosses.gains || 0;
            gainsAndLosses.losses = gainsAndLosses.losses || 0;
          }
          expenseByMonth.gains = gainsAndLosses.gains as number;
          expenseByMonth.losses = gainsAndLosses.losses as number;
        }
      }
    }
    return expensesByMonth;
  } catch (e: any) {
    return new Error(e.message);
  }
};
