import prismaClient from "../config/prismaConfig";
import { IExpense } from "../model/Expense.model";
import { IUser } from "../model/User.model";
import dayjs from "dayjs";

export const createExpense = async (expense: IExpense, user: IUser) => {
  try {
    return await prismaClient.expense.create({
      data: {
        amount: Number(expense.amount),
        tagId: expense.tagId,
        userId: user.id,
        description: expense?.description ?? undefined,
        date: dayjs(expense.date).toDate(),
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const getExpense = async (id: string) => {
  try {
    return await prismaClient.expense.findUnique({
      where: {
        id,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const getExpenses = async (user?: IUser) => {
  let where: any = {};
  if (user) {
    where = {
      userId: user.id,
    };
  }
  try {
    return await prismaClient.expense.findMany({
      where,
      select: {
        id: true,
        amount: true,
        description: false,
        date: true,
        tag: {
          select: {
            name: true,
            id: true,
            color: true,
          },
        },
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const updateExpense = async (id: string, expense: IExpense) => {
  try {
    return await prismaClient.expense.update({
      where: {
        id,
      },
      data: {
        amount: Number(expense.amount),
        tagId: expense.tagId,
        description: expense?.description ?? undefined,
        date: dayjs(expense.date).toDate(),
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const deleteExpense = async (id: string) => {
  try {
    return await prismaClient.expense.delete({
      where: {
        id,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};
