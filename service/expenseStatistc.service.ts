import prismaClient from "../config/prismaConfig";
import { EnumCategory } from "../enum/Category.enum";
import { IUser } from "../model/User.model";

export const getExpenseStatistic = async (user: IUser) => {
  try {
    const expenseGainSum = await prismaClient.expense.aggregate({
      where: {
        userId: user.id,
        category: EnumCategory.GAIN,
      },
      _sum: {
        amount: true,
      },
    });
    const expenseLossSum = await prismaClient.expense.aggregate({
      where: {
        userId: user.id,
        category: EnumCategory.LOSS,
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
