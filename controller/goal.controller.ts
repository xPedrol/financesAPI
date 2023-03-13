import { Request, Response } from "express";
import { getAuthenticatedUserFromToken } from "../service/auth.service";
import { IUser } from "../model/User.model";
import {
  createGoal,
  deleteGoal,
  getGoal,
  getGoalByDate,
  getGoals,
  updateGoal,
} from "../service/goal.service";

export const controllerCreateGoal = async (req: Request, res: Response) => {
  const goal = req.body;
  const user = getAuthenticatedUserFromToken(
    req.headers.authorization as string
  );
  const createdGoal = await createGoal(goal, user as IUser);
  if (createdGoal instanceof Error) {
    res.status(400).json({ message: createdGoal.message });
    return;
  }
  res.status(200).json(createdGoal);
};

export const controllerGetGoal = async (req: Request, res: Response) => {
  const goal = await getGoal(req.params.id);
  if (goal instanceof Error) {
    res.status(500).json(goal.message);
  }
  res.status(200).json(goal);
};

export const controllerGetGoals = async (req: Request, res: Response) => {
  const user = getAuthenticatedUserFromToken(
    req.headers.authorization as string
  );
  const goals = await getGoals(user as IUser);
  if (goals instanceof Error) {
    res.status(500).json(goals.message);
    return;
  }
  res.status(200).json(goals);
};

export const controllerUpdateGoal = async (req: Request, res: Response) => {
  const goal = req.body;
  const updatedGoal = await updateGoal(req.params.id, goal);
  if (updatedGoal instanceof Error) {
    res.status(500).json(updatedGoal.message);
    return;
  }
  res.status(200).json(updatedGoal);
};

export const controllerDeleteGoal = async (req: Request, res: Response) => {
  const deletedGoal = await deleteGoal(req.params.id);
  if (deletedGoal instanceof Error) {
    res.status(500).json(deletedGoal.message);
    return;
  }
  res.status(200).json(deletedGoal);
};

export const controllerGetGoalByDate = async (req: Request, res: Response) => {
  const user = getAuthenticatedUserFromToken(
    req.headers.authorization as string
  );
  const goals = await getGoalByDate(req.query.date as string, user as IUser);
  if (goals instanceof Error) {
    res.status(500).json(goals.message);
    return;
  } else {
    if (goals && goals.length !== 0) {
      res.status(200).json(goals[0]);
      return;
    }
    res.status(200).json(null);
  }
};
