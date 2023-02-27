import {Request, Response} from "express";
import {getAuthenticatedUserFromToken} from "../service/auth.service";
import {IUser} from "../model/User.model";
import {
    createExpense,
    deleteExpense,
    getExpense,
    getExpenseCount,
    getExpenses,
    updateExpense,
} from "../service/expense.service";
import dayjs from "dayjs";
import {removeEmptyProperties} from "../utils/cleanObject.utils";
import {getPaginationParams} from "../utils/handlePagination.utils";

export const controllerCreateExpense = async (req: Request, res: Response) => {
    const expense = req.body;
    const user = getAuthenticatedUserFromToken(
        req.headers.authorization as string
    );
    const createdExpense = await createExpense(expense, user as IUser);
    if (createdExpense instanceof Error) {
        res.status(400).json({message: createdExpense.message});
    }
    res.status(200).json(createdExpense);
};

export const controllerGetExpense = async (req: Request, res: Response) => {
    const expense = await getExpense(req.params.id);
    if (expense instanceof Error) {
        res.status(500).json(expense.message);
    }
    res.status(200).json(expense);
};

export const controllerGetExpenses = async (req: Request, res: Response) => {
    const user = getAuthenticatedUserFromToken(
        req.headers.authorization as string
    );
    if (req.query.date === undefined) {
        req.query.date = `${dayjs().month() + 1}-01-${dayjs().year()}`;
    }
    let query = {
        userId: (user as IUser).id,
        date: {
            gte: dayjs(req.query.date as string).startOf("month").toDate(),
            lte: dayjs(req.query.date as string).endOf("month").toDate(),
        },
    }
    const paginate = getPaginationParams(req.query);
    const expenses = await getExpenses(
        query, paginate
    );
    if (expenses instanceof Error) {
        res.status(500).json(expenses.message);
    }
    res.status(200).json(expenses);
};

export const controllerUpdateExpense = async (req: Request, res: Response) => {
    const expense = req.body;
    const updatedExpense = await updateExpense(req.params.id, expense);
    if (updatedExpense instanceof Error) {
        res.status(500).json(updatedExpense.message);
    }
    res.status(200).json(updatedExpense);
};

export const controllerDeleteExpense = async (req: Request, res: Response) => {
    const deletedExpense = await deleteExpense(req.params.id);
    if (deletedExpense instanceof Error) {
        res.status(500).json(deletedExpense.message);
    }
    res.status(200).json(deletedExpense);
};

export const controllerGetExpenseCount = async (
    req: Request,
    res: Response
) => {
    const user = getAuthenticatedUserFromToken(
        req.headers.authorization as string
    );
    if (req.query.date === undefined) {
        req.query.date = `${dayjs().month() + 1}-01-${dayjs().year()}`;
    }
    const count = await getExpenseCount(user as IUser, req.query.date as string);
    if (count instanceof Error) {
        res.status(500).json(count.message);
    }
    res.status(200).json(count);
};
