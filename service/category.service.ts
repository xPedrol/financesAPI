import { IExpense } from "../model/Expense.model";
import { IUser } from "../model/User.model";
import prismaClient from "../config/prismaConfig";
import { ICategory } from "../model/Category.model";

export const createCategory = async (expense: ICategory, user: IUser) => {
  try {
    return await prismaClient.category.create({
      data: {
        color: expense.color,
        description: expense.description,
        name: expense.name,
        userId: user.id,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const getCategory = async (id: string) => {
  try {
    return await prismaClient.category.findUnique({
      where: {
        id,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const getCategories = async (user?: IUser) => {
  let where: any = {};
  if (user) {
    where = {
      userId: user.id,
    };
  }
  try {
    return await prismaClient.category.findMany({
      where,
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const updateCategory = async (id: string, category: ICategory) => {
  try {
    return await prismaClient.category.update({
      where: {
        id,
      },
      data: {
        color: category.color,
        description: category.description,
        name: category.name,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const deleteCategory = async (id: string) => {
  try {
    return await prismaClient.category.delete({
      where: {
        id,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};
