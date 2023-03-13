import { Request, Response } from "express";
import {
  getAuthenticatedUserFromMongo,
  getAuthenticatedUserFromToken,
  loginUser,
  registerUser,
  updateUser,
  verifyUserToken,
} from "../service/auth.service";
import { KnownError } from "../model/KnownError.model";
import { IUser } from "../model/User.model";

export const login = async (req: Request, res: Response) => {
  const user = req.body;
  const loggedUser = await loginUser(user);
  if (loggedUser instanceof KnownError) {
    return res
      .status(401)
      .json({ message: loggedUser.message, showError: true });
  } else if (loggedUser instanceof Error) {
    res.status(400).json({ message: loggedUser.message });
  } else {
    if (loggedUser.user && loggedUser.token) {
      delete (loggedUser.user as any).password;
      res.set("Authorization", loggedUser.token);
      res.status(200).json({ user: loggedUser.user, token: loggedUser.token });
    } else {
      res.status(400).json({ message: "Invalid credentials", showError: true });
    }
  }
};

export const controllerUpdateUser = async (req: Request, res: Response) => {
  const user = req.body;
  const sessionUser = getAuthenticatedUserFromToken(
    req.headers.authorization as string
  );
  if (sessionUser && (sessionUser as IUser).id !== req.params.id) {
    res.status(401).json({ message: "Unauthorized", showError: true });
    return;
  }
  const updatedUser = await updateUser((sessionUser as IUser).id, user);
  if (updatedUser instanceof KnownError) {
    res.status(400).json({ message: updatedUser.message, showError: true });
    return;
  }
  if (updatedUser instanceof Error) {
    res.status(500).json({ message: updatedUser.message });
    return;
  }
  delete (updatedUser as any).password;
  res.status(200).json(updatedUser);
};

export const register = async (req: Request, res: Response) => {
  const user = req.body;
  const registeredUser = await registerUser(user);
  if (registeredUser instanceof KnownError) {
    res.status(400).json({ message: registeredUser.message, showError: true });
    return;
  }
  if (registeredUser instanceof Error) {
    res.status(500).json({ message: registeredUser.message });
    return;
  }
  delete (registeredUser as any).password;
  res.status(200).json(registeredUser);
};

export const isLoggedIn = async (req: Request, res: Response) => {
  if (req.headers?.authorization) {
    const result = verifyUserToken(req.headers.authorization);
    if (result instanceof Error) {
      res.status(400).json({ message: result.message });
      return;
    }
    res.status(200).json(result);
    return;
  } else {
    res.status(400).json({ message: "Invalid token" });
  }
};

export const getLoggedInUser = async (req: Request, res: Response) => {
  const user = await getAuthenticatedUserFromMongo(
    req.headers.authorization as string
  );
  if (user instanceof Error) {
    res.status(400).json({ message: user.message });
    return;
  }
  delete (user as any).password;
  res.status(200).json(user);
};
