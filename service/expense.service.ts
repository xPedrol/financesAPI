import prismaClient from "../config/prismaConfig";
import {IExpense} from "../model/Expense.model";
import {IUser} from "../model/User.model";

export const createExpense = async (expense: IExpense, user: IUser) => {
    try {
        return await prismaClient.expense.create({
            data: {
                amount: expense.amount,
                categoryId: expense.categoryId,
                userId: user.id
            }
        });
    } catch (e: any) {
        return new Error(e.message);
    }
};

export const getExpense = async (id: string,) => {
    try {
        return await prismaClient.expense.findUnique({
            where: {
                id
            }
        });
    } catch (e: any) {
        return new Error(e.message);
    }
};

export const getExpenses = async (user?: IUser) => {
    let where: any = {};
    if (user) {
        where = {
            userId: user.id
        };
    }
    try {
        return await prismaClient.expense.findMany
        ({
            where
        });
    } catch (e: any) {
        return new Error(e.message);
    }
};

export const updateExpense = async (id: string, expense: IExpense) => {
    try {
        return await prismaClient.expense.update({
            where: {
                id
            },
            data: {
                amount: expense.amount,
                categoryId: expense.categoryId
            }
        });
    } catch (e: any) {
        return new Error(e.message);
    }
};

export const deleteExpense = async (id: string) => {
    try {
        return await prismaClient.expense.delete({
            where: {
                id
            }
        });
    } catch (e: any) {
        return new Error(e.message);
    }
};