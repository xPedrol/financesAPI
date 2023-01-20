import { Request, Response } from "express";
import { getAuthenticatedUserFromToken } from "../service/auth.service";
import { IUser } from "../model/User.model";
import {
  createTag,
  deleteTag,
  getTags,
  getTag,
  updateTag,
} from "../service/tag.service";

export const controllerCreateTag = async (req: Request, res: Response) => {
  try {
    const tag = req.body;
    const user = getAuthenticatedUserFromToken(
      req.headers.authorization as string
    );
    const createdExpense = await createTag(tag, user as IUser);
    res.status(200).json(createdExpense);
  } catch (e: any) {
    res.status(500).json(e.message);
  }
};

export const controllerGetTag = async (req: Request, res: Response) => {
  try {
    const tag = await getTag(req.params.id);
    res.status(200).json(tag);
  } catch (e: any) {
    res.status(500).json(e.message);
  }
};

export const controllerGetTags = async (req: Request, res: Response) => {
  try {
    const user = getAuthenticatedUserFromToken(
      req.headers.authorization as string
    );
    const tags = await getTags(user as IUser);
    res.status(200).json(tags);
  } catch (e: any) {
    res.status(500).json(e.message);
  }
};

export const controllerUpdateTag = async (req: Request, res: Response) => {
  try {
    const tag = req.body;
    const updatedTag = await updateTag(req.params.id, tag);
    res.status(200).json(updatedTag);
  } catch (e: any) {
    res.status(500).json(e.message);
  }
};

export const controllerDeleteTag = async (req: Request, res: Response) => {
  try {
    const deletedTag = await deleteTag(req.params.id);
    res.status(200).json(deletedTag);
  } catch (e: any) {
    res.status(500).json(e.message);
  }
};
