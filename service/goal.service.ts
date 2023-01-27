import prismaClient from "../config/prismaConfig";
import { IGoal } from "../model/Goal.model";
import { IUser } from "../model/User.model";
import dayjs from "dayjs";

export const createGoal = async (goal: IGoal, user: IUser) => {
  try {
    return await prismaClient.goal.create({
      data: {
        amount: Number(goal.amount),
        userId: user.id,
        date: dayjs(goal.date).toDate(),
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const getGoal = async (id: string) => {
  try {
    return await prismaClient.goal.findUnique({
      where: {
        id,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const getGoals = async (user?: IUser) => {
  let where: any = {};
  if (user) {
    where = {
      userId: user.id,
    };
  }
  try {
    return await prismaClient.goal.findMany({
      where,
      select: {
        id: true,
        amount: true,
        date: true,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const updateGoal = async (id: string, goal: IGoal) => {
  try {
    return await prismaClient.goal.update({
      where: {
        id,
      },
      data: {
        amount: Number(goal.amount),
        date: dayjs(goal.date).toDate(),
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const deleteGoal = async (id: string) => {
  try {
    return await prismaClient.goal.delete({
      where: {
        id,
      },
    });
  } catch (e: any) {
    return new Error(e.message);
  }
};

export const getGoalByDate = async (nDate: string, user: IUser) => {
  try {
    return await prismaClient.$queryRaw<IGoal[]>`SELECT * FROM Goal
       WHERE DATE_FORMAT(date,'%m/%Y') = ${nDate} AND userId = ${user.id} ORDER BY date DESC`;
  } catch (e: any) {
    return new Error(e.message);
  }
};
