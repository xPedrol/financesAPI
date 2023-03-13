import { Request, Response } from "express";
import { getAuthenticatedUserFromToken } from "../service/auth.service";
import { IUser } from "../model/User.model";
import {
  createNote,
  deleteNote,
  getNote,
  getNoteCount,
  getNotes,
  switchNoteGroup,
  updateNote,
  updateNoteFixed,
} from "../service/note.service";
import dayjs from "dayjs";

export const controllerCreateNote = async (req: Request, res: Response) => {
  const note = req.body;
  const user = getAuthenticatedUserFromToken(
    req.headers.authorization as string
  );
  const createdNote = await createNote(note, user as IUser);
  if (createdNote instanceof Error) {
    res.status(400).json({ message: createdNote.message });
    return;
  }
  res.status(200).json(createdNote);
};

export const controllerGetNote = async (req: Request, res: Response) => {
  const note = await getNote(req.params.id);
  if (note instanceof Error) {
    res.status(500).json(note.message);
    return;
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
    return;
  }
  res.status(200).json(notes);
};

export const controllerUpdateNote = async (req: Request, res: Response) => {
  const note = req.body;
  const updatedNote = await updateNote(req.params.id, note);
  if (updatedNote instanceof Error) {
    res.status(500).json(updatedNote.message);
    return;
  }
  res.status(200).json(updatedNote);
};

export const controllerUpdateNoteFixed = async (
  req: Request,
  res: Response
) => {
  const updatedNote = await updateNoteFixed(req.params.id);
  if (updatedNote instanceof Error) {
    res.status(500).json(updatedNote.message);
    return;
  }
  res.status(200).json(updatedNote);
};

export const controllerDeleteNote = async (req: Request, res: Response) => {
  const deletedNote = await deleteNote(req.params.id);
  if (deletedNote instanceof Error) {
    res.status(500).json(deletedNote.message);
    return;
  }
  res.status(200).json(deletedNote);
};

export const controllerGetNoteCount = async (req: Request, res: Response) => {
  const user = getAuthenticatedUserFromToken(
    req.headers.authorization as string
  );
  const notes = await getNoteCount(user as IUser);
  if (notes instanceof Error) {
    res.status(500).json(notes.message);
    return;
  }
  res.status(200).json(notes);
};
export const controllerSwitchNoteGroup = async (
  req: Request,
  res: Response
) => {
  const note = await switchNoteGroup(req.params.id, req.params.noteGroupId);
  if (note instanceof Error) {
    res.status(500).json(note.message);
    return;
  }
  res.status(200).json(note);
};
