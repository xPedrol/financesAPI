import { Request, Response } from "express";
import { getAuthenticatedUserFromToken } from "../service/auth.service";
import { IUser } from "../model/User.model";
import {
  countNotes,
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
  updateNoteFavorite,
} from "../service/note.service";

export const controllerCreateNote = async (req: Request, res: Response) => {
  const note = req.body;
  const user = getAuthenticatedUserFromToken(
    req.headers.authorization as string
  );
  const createdNote = await createNote(note, user as IUser);
  if (createdNote instanceof Error) {
    res.status(400).json({ message: createdNote.message });
  }
  res.status(200).json(createdNote);
};

export const controllerGetNote = async (req: Request, res: Response) => {
  const note = await getNote(req.params.id);
  if (note instanceof Error) {
    res.status(500).json(note.message);
  }
  res.status(200).json(note);
};

export const controllerGetNotes = async (req: Request, res: Response) => {
  const user = getAuthenticatedUserFromToken(
    req.headers.authorization as string
  );
  const notes = await getNotes(user as IUser);
  if (notes instanceof Error) {
    res.status(500).json(notes.message);
  }
  res.status(200).json(notes);
};

export const controllerUpdateNote = async (req: Request, res: Response) => {
  const note = req.body;
  const updatedNote = await updateNote(req.params.id, note);
  if (updatedNote instanceof Error) {
    res.status(500).json(updatedNote.message);
  }
  res.status(200).json(updatedNote);
};

export const controllerUpdateNoteFavorite = async (
  req: Request,
  res: Response
) => {
  const updatedNote = await updateNoteFavorite(req.params.id);
  if (updatedNote instanceof Error) {
    res.status(500).json(updatedNote.message);
  }
  res.status(200).json(updatedNote);
};

export const controllerDeleteNote = async (req: Request, res: Response) => {
  const deletedNote = await deleteNote(req.params.id);
  if (deletedNote instanceof Error) {
    res.status(500).json(deletedNote.message);
  }
  res.status(200).json(deletedNote);
};

export const controllerCountNotes = async (req: Request, res: Response) => {
  const user = getAuthenticatedUserFromToken(
    req.headers.authorization as string
  );
  const notes = await countNotes(user as IUser);
  if (notes instanceof Error) {
    res.status(500).json(notes.message);
  }
  res.status(200).json(notes);
};
