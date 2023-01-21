import prismaClient from "../config/prismaConfig";
import { INote } from "../model/Note.model";
import { IUser } from "../model/User.model";
import dayjs from "dayjs";

export const createNote = async (note: INote, user: IUser) => {
  try {
    return await prismaClient.note.create({
      data: {
        title: note.title,
        description: note.description,
        createdAt: dayjs(note.createdAt).toDate(),
        date: dayjs(note.date).toDate(),
        color: note.color,
        favorite: note.favorite,
        userId: user.id,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const getNote = async (id: string) => {
  try {
    return await prismaClient.note.findUnique({
      where: {
        id,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const getNotes = async (user?: IUser) => {
  let where: any = {};
  if (user) {
    where = {
      userId: user.id,
    };
  }
  try {
    return await prismaClient.note.findMany({
      where,
      select: {
        id: true,
        title: true,
        date: true,
        favorite: true,
        description: true,
        color: true,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const updateNote = async (id: string, note: INote) => {
  try {
    return await prismaClient.note.update({
      where: {
        id,
      },
      data: {
        title: note.title,
        description: note.description,
        date: dayjs(note.date).toDate(),
        color: note.color,
        favorite: note.favorite,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const deleteNote = async (id: string) => {
  try {
    return await prismaClient.note.delete({
      where: {
        id,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const updateNoteFavorite = async (id: string) => {
  try {
    const note = await getNote(id);
    if (!(note instanceof Error) && note) {
      return await prismaClient.note.update({
        where: {
          id,
        },
        data: {
          favorite: !note.favorite,
        },
      });
    }
    throw new Error("Note not found");
  } catch (e: any) {
    return new Error(e.message);
  }
};
export const countNotes = async (user: IUser) => {
  try {
    return await prismaClient.note.aggregate({
      where: {
        userId: user.id,
      },
      _count: true,
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};
