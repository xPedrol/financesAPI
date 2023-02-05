import { Request, Response } from "express";
import { getAuthenticatedUserFromToken } from "../service/auth.service";
import { IUser } from "../model/User.model";
import {
  createNoteGroup,
  deleteNoteGroup,
  getNoteGroup,
  getNoteGroupCount,
  getNoteGroups,
  updateNoteGroup,
} from "../service/noteGroup.service";
import { removeEmptyProperties } from "../utils/cleanObject.utils";
import { getPaginationParams } from "../utils/handlePagination.utils";

export const controllerCreateNoteGroup = async (
  req: Request,
  res: Response
) => {
  const noteGroup = req.body;
  const user = getAuthenticatedUserFromToken(
    req.headers.authorization as string
  );
  const createdNoteGroup = await createNoteGroup(noteGroup, user as IUser);
  if (createdNoteGroup instanceof Error) {
    res.status(400).json({ message: createdNoteGroup.message });
  }
  res.status(200).json(createdNoteGroup);
};

export const controllerGetNoteGroup = async (req: Request, res: Response) => {
  const noteGroup = await getNoteGroup(req.params.id);
  if (noteGroup instanceof Error) {
    res.status(500).json(noteGroup.message);
  }
  res.status(200).json(noteGroup);
};

export const controllerGetNoteGroups = async (req: Request, res: Response) => {
  const user = getAuthenticatedUserFromToken(
    req.headers.authorization as string
  );
  let query = {
    userId: (user as IUser).id,
    name: {
      contains: req.query.name as string,
    },
  };
  query = removeEmptyProperties(query);
  const paginate = getPaginationParams(req.query);
  const noteGroups = await getNoteGroups(query, paginate);
  if (noteGroups instanceof Error) {
    res.status(500).json(noteGroups.message);
  }
  res.status(200).json(noteGroups);
};

export const controllerUpdateNoteGroup = async (
  req: Request,
  res: Response
) => {
  const noteGroup = req.body;
  const updatedNoteGroup = await updateNoteGroup(req.params.id, noteGroup);
  if (updatedNoteGroup instanceof Error) {
    res.status(500).json(updatedNoteGroup.message);
  }
  res.status(200).json(updatedNoteGroup);
};

export const controllerDeleteNoteGroup = async (
  req: Request,
  res: Response
) => {
  const deletedNoteGroup = await deleteNoteGroup(req.params.id);
  if (deletedNoteGroup instanceof Error) {
    res.status(500).json(deletedNoteGroup.message);
  }
  res.status(200).json(deletedNoteGroup);
};

export const controllerGetNoteGroupCount = async (
  req: Request,
  res: Response
) => {
  const user = getAuthenticatedUserFromToken(
    req.headers.authorization as string
  );
  const noteGroups = await getNoteGroupCount(user as IUser);
  if (noteGroups instanceof Error) {
    res.status(500).json(noteGroups.message);
  }
  res.status(200).json(noteGroups);
};
