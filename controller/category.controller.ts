import { Request, Response } from "express";
import { getAuthenticatedUserFromToken } from "../service/auth.service";
import { IUser } from "../model/User.model";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../service/category.service";

export const controllerCreateCategory = async (req: Request, res: Response) => {
  try {
    const category = req.body;
    const user = getAuthenticatedUserFromToken(
      req.headers.authorization as string
    );
    const createdExpense = await createCategory(category, user as IUser);
    res.status(200).json(createdExpense);
  } catch (e: any) {
    res.status(500).json(e.message);
  }
};

export const controllerGetCategory = async (req: Request, res: Response) => {
  try {
    const category = await getCategory(req.params.id);
    res.status(200).json(category);
  } catch (e: any) {
    res.status(500).json(e.message);
  }
};

export const controllerGetCategories = async (req: Request, res: Response) => {
  try {
    const user = getAuthenticatedUserFromToken(
      req.headers.authorization as string
    );
    const categories = await getCategories(user as IUser);
    res.status(200).json(categories);
  } catch (e: any) {
    res.status(500).json(e.message);
  }
};

export const controllerUpdateCategory = async (req: Request, res: Response) => {
  try {
    const category = req.body;
    const updatedCategory = await updateCategory(req.params.id, category);
    res.status(200).json(updatedCategory);
  } catch (e: any) {
    res.status(500).json(e.message);
  }
};

export const controllerDeleteCategory = async (req: Request, res: Response) => {
  try {
    const deletedCategory = await deleteCategory(req.params.id);
    res.status(200).json(deletedCategory);
  } catch (e: any) {
    res.status(500).json(e.message);
  }
};
