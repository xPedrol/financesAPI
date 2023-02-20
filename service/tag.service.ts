import { IExpense } from "../model/Expense.model";
import { IUser } from "../model/User.model";
import prismaClient from "../config/prismaConfig";
import { ITag } from "../model/Tag.model";
import dayjs from "dayjs";
import { IPaginate } from "../model/Paginate.model";
import { KnownError } from "../model/KnownError.model";
import { handlePaginate } from "./paginate.utils";

export const createTag = async (expense: ITag, user: IUser) => {
  try {
    return await prismaClient.tag.create({
      data: {
        color: expense.color,
        description: expense.description,
        name: expense.name,
        userId: user.id,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const getTag = async (id: string) => {
  try {
    return await prismaClient.tag.findUnique({
      where: {
        id,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const getTags = async (query: any, paginate: IPaginate) => {
  try {
    return await prismaClient.tag.findMany({
      ...query,
      ...handlePaginate(paginate),
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const updateTag = async (id: string, tag: ITag) => {
  try {
    return await prismaClient.tag.update({
      where: {
        id,
      },
      data: {
        color: tag.color,
        description: tag.description,
        name: tag.name,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const deleteTag = async (id: string) => {
  try {
    const expense = await prismaClient.expense.findFirst({
      where: {
        tagId: id,
      },
    });
    if (expense) {
      return new KnownError("Tag is used in expense");
    }
    return await prismaClient.tag.delete({
      where: {
        id,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const getTagCount = async (query: any) => {
  let where: any = query;
  try {
    return await prismaClient.tag.count({
      where,
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};
