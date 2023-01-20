import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers?.authorization) {
      const jwtUser = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET as string
      );
      if (jwtUser) {
        next();
      } else {
        res.status(403).json({ message: "Invalid token" });
      }
    } else {
      throw new Error("");
    }
  } catch (e: any) {
    res.status(403).json({ message: "Invalid token" });
  }
};
