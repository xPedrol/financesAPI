import {Request, Response} from "express";
import {getAuthenticatedUser, loginUser, registerUser, verifyUserToken} from "../service/auth.service";

export const login = async (req: Request, res: Response) => {
    const user = req.body;
    console.log(req.body);
    const loggedUser = await loginUser(user);
    if (loggedUser instanceof Error) {
        res.status(400).json({message: loggedUser.message});
    } else {
        if (loggedUser.user && loggedUser.token) {
            res.set('Authorization', loggedUser.token);
            res.status(200).json({user: loggedUser.user, token: loggedUser.token});
        } else {
            res.status(400).json({message: 'Invalid credentials'});
        }
    }
};

export const register = async (req: Request, res: Response) => {
    const user = req.body;
    const registeredUser = await registerUser(user);
    if (registeredUser instanceof Error) {
        res.status(400).json({message: registeredUser.message});
    }
    res.status(200).json(registeredUser);
};

export const isLoggedIn = async (req: Request, res: Response) => {
    if (req.headers?.authorization) {
        const result = verifyUserToken(req.headers.authorization);
        if (result instanceof Error) {
            res.status(400).json({message: result.message});
        }
        res.status(200).json(result);
    } else {
        res.status(400).json({message: 'Invalid token'});
    }
};

export const getLoggedInUser = async (req: Request, res: Response) => {
        const user = await getAuthenticatedUser(req.headers.authorization as string);
        if (user instanceof Error) {
            res.status(400).json({message: user.message});
        }
        res.status(200).json(user);
};