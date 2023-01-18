import {Request, Response} from "express";
import {getAuthenticatedUserFromToken} from "../service/auth.service";
import {IUser} from "../model/User.model";
import {createExpense, deleteExpense, getExpense, getExpenses, updateExpense} from "../service/expense.service";

export const controllerCreateExpense = async (req: Request, res: Response) => {
    try {
        const expense = req.body;
        const user = getAuthenticatedUserFromToken(req.headers.authorization as string);
        const createdExpense = await createExpense(expense, user as IUser);
        res.status(200).json(createdExpense);
    } catch (e: any) {
        res.status(500).json(e.message);
    }
};

export const controllerGetExpense = async (req: Request, res: Response) => {
    try {
        const expense = await getExpense(req.params.id);
        res.status(200).json(expense);
    } catch (e: any) {
        res.status(500).json(e.message);
    }
};

export const controllerGetExpenses = async (req: Request, res: Response) => {
    try {
        const user = getAuthenticatedUserFromToken(req.headers.authorization as string);
        const expenses = await getExpenses(user as IUser);
        res.status(200).json(expenses);
    } catch (e: any) {
        res.status(500).json(e.message);
    }
};

export const controllerUpdateExpense = async (req: Request, res: Response) => {
    try {
        const expense = req.body;
        const updatedExpense = await updateExpense(req.params.id, expense);
        res.status(200).json(updatedExpense);
    } catch (e: any) {
        res.status(500).json(e.message);
    }
};

export const controllerDeleteExpense = async (req: Request, res: Response) => {
    try {
        const deletedExpense = await deleteExpense(req.params.id);
        res.status(200).json(deletedExpense);
    } catch (e: any) {
        res.status(500).json(e.message);
    }
};
