import { Request, Response } from "express";
import { getAuthenticatedUserFromToken } from "../service/auth.service";
import { IUser } from "../model/User.model";
import {
  createTag,
  deleteTag,
  getTag,
  getTagCount,
  getTags,
  updateTag,
} from "../service/tag.service";
import { removeEmptyProperties } from "../utils/cleanObject.utils";
import { KnownError } from "../model/KnownError.model";
import { getPaginationParams } from "../utils/handlePagination.utils";

export const controllerCreateTag = async (req: Request, res: Response) => {
  const tag = req.body;
  const user = getAuthenticatedUserFromToken(
    req.headers.authorization as string
  );
  const createdExpense = await createTag(tag, user as IUser);
  res.status(200).json(createdExpense);
};

export const controllerGetTag = async (req: Request, res: Response) => {
  const tag = await getTag(req.params.id);
  if (tag instanceof Error) {
    res.status(500).json(tag.message);
  }
  res.status(200).json(tag);
};

export const controllerGetTags = async (req: Request, res: Response) => {
  const user = getAuthenticatedUserFromToken(
    req.headers.authorization as string
  );
  let query = {
    where: {
      userId: (user as IUser).id,
    },
    orderBy: {
      createdAt: "desc",
    },
  };
  if (req.query.name) {
    query.where = {
      ...query.where,
      // @ts-ignore
      name: {
        contains: req.query.name,
      },
    };
  }
  query = removeEmptyProperties(query);
  const paginate = getPaginationParams(req.query);
  const tags = await getTags(query, paginate);
  if (tags instanceof Error) {
    res.status(500).json(tags.message);
  } else {
    res.status(200).json(tags);
  }
};

export const controllerUpdateTag = async (req: Request, res: Response) => {
  const tag = req.body;
  const updatedTag = await updateTag(req.params.id, tag);
  if (updatedTag instanceof Error) {
    res.status(500).json(updatedTag.message);
  }
  res.status(200).json(updatedTag);
};

export const controllerDeleteTag = async (req: Request, res: Response) => {
  const deletedTag = await deleteTag(req.params.id);
  if (deletedTag instanceof KnownError) {
    res.status(401).json({ message: deletedTag.message, showError: true });
  } else if (deletedTag instanceof Error) {
    res.status(500).json(deletedTag.message);
  }
  res.status(200).json(deletedTag);
};

export const controllerGetTagCount = async (req: Request, res: Response) => {
  const user = getAuthenticatedUserFromToken(
    req.headers.authorization as string
  );
  let query = {
    userId: (user as IUser).id,
  };
  query = removeEmptyProperties(query);
  const count = await getTagCount(query);
  if (count instanceof Error) {
    res.status(500).json(count.message);
  }
  res.status(200).json(count);
};
