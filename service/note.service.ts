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
        userId: user.id,
        fixed: note.fixed,
        noteGroupId: note.noteGroupId || null,
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
  let where: any = {
    userId: user?.id,
  };
  if (!user) delete where.userId;
  try {
    return await prismaClient.note.findMany({
      where,
      select: {
        id: true,
        title: true,
        date: true,
        description: true,
        fixed: true,
        noteGroupId: true,
        noteGroup: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: [
        {
          fixed: "desc",
        },
        {
          date: "desc",
        },
      ],
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
        fixed: note.fixed,
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

export const updateNoteFixed = async (id: string) => {
  try {
    const note = await getNote(id);
    if (!(note instanceof Error) && note) {
      return await prismaClient.note.update({
        where: {
          id,
        },
        data: {
          fixed: !note.fixed,
        },
      });
    }
    throw new Error("Note not found");
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const getNoteCount = async (user: IUser) => {
  let where: any = {};
  where = {
    userId: user.id,
  };
  try {
    return await prismaClient.note.count({
      where,
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const switchNoteGroup = async (
  id: string,
  noteGroupId: string | null
) => {
  if (noteGroupId === "delete") noteGroupId = null;
  try {
    return await prismaClient.note.update({
      where: {
        id,
      },
      data: {
        noteGroupId,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};
