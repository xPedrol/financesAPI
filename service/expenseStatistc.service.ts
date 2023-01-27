import prismaClient from "../config/prismaConfig";
import { EnumCategory } from "../enum/Category.enum";
import { IUser } from "../model/User.model";
import { IGoal } from "../model/Goal.model";

export const getExpenseStatistic = async (user: IUser) => {
  try {
    const expenseGainSum = await prismaClient.expense.aggregate({
      where: {
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
): Promise<IGoal[] | Error> => {
  try {
    return await prismaClient.$queryRaw<
      IGoal[]
    >`SELECT DATE_FORMAT(date,'%m/%Y') as date,SUM(amount) as amount FROM Expense
       WHERE userId = ${user.id} GROUP BY DATE_FORMAT(date,'%m/%Y')  ORDER BY date DESC`;
  } catch (e: any) {
    return new Error(e.message);
  }
};
