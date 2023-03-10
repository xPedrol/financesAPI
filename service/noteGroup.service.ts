import prismaClient from "../config/prismaConfig";
import { INoteGroup } from "../model/NoteGroup.model";
import { IUser } from "../model/User.model";
import { handlePaginate } from "./paginate.utils";
import { IPaginate } from "../model/Paginate.model";

export const createNoteGroup = async (noteGroup: INoteGroup, user: IUser) => {
  try {
    return await prismaClient.noteGroup.create({
      data: {
        name: noteGroup.name,
        userId: user.id,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const getNoteGroup = async (id: string) => {
  try {
    return await prismaClient.noteGroup.findUnique({
      where: {
        id,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const getNoteGroups = async (query: any, paginate: IPaginate) => {
  let where: any = query;
  try {
    return await prismaClient.noteGroup.findMany({
      where,
      ...handlePaginate(paginate),
      select: {
        id: true,
        name: true,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const updateNoteGroup = async (id: string, noteGroup: INoteGroup) => {
  try {
    return await prismaClient.noteGroup.update({
      where: {
        id,
      },
      data: {
        name: noteGroup.name,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const deleteNoteGroup = async (id: string) => {
  try {
    return await prismaClient.noteGroup.delete({
      where: {
        id,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const getNoteGroupCount = async (user: IUser) => {
  let where: any = {};
  where = {
    userId: user.id,
  };
  try {
    return await prismaClient.noteGroup.count({
      where,
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};
