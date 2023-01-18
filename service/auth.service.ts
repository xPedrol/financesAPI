import {ILoginUser, IRegisterUser, IUser} from "../model/User.model";
import prismaClient from "../config/prismaConfig";
import bcrypt from 'bcryptjs';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {KnownError} from "../model/KnownError.model";

export const loginUser = async (loginUser: ILoginUser) => {
    try {
        const user = await prismaClient.user.findFirst({
            where: {
                email: loginUser.email
            }
        });
        if (!user || !user.password || !bcrypt.compareSync(loginUser.password, user.password)) {
            return new KnownError("Invalid credentials");
        }
        const jwtUser = {
            id: user.id,
            email: user.email,
            name: user.name,
        };
        const token = jwt.sign(jwtUser, process.env.JWT_SECRET as string, {expiresIn: '1h'});
        return {token, user};
    } catch (e: any) {
        return new Error(e.message);
    }
};


export const registerUser = async (user: IRegisterUser) => {
    try {
        const userExist = await prismaClient.user.findFirst({
            where: {
                email: user.email
            }
        });
        if (!userExist) {
            user.password = bcrypt.hashSync(user.password, Number(process.env.BCRYPT_SALT));
            return await prismaClient.user.create({
                data: user
            });
        } else {
            return new KnownError("User already exist");
        }
    } catch (e: any) {
        return new Error(e.message);
    }
};

export const verifyUserToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (e: any) {
        return new Error(e.message);
    }
};

export const getAuthenticatedUserFromMongo = async (token: string) => {
    try {
        const jwtUser = jwt.verify(token, process.env.JWT_SECRET as string);
        const user = await prismaClient.user.findUnique({
            where: {
                id: (jwtUser as any).id
            }
        });
        delete (user as any).password;
        return user;
    } catch (e: any) {
        return new Error(e.message);
    }
};

export const getAuthenticatedUserFromToken = (token: string): string | JwtPayload => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (e: any) {
        return new Error(e.message);
    }
};