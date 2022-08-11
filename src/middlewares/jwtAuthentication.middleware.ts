import { NextFunction, Request, Response } from "express";
import JWT, { JwtPayload } from "jsonwebtoken";
import { User } from "../utils/Models/user.model";

export const jwtAuthenticationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authorizationHeader = req.headers["authorization"]

    // error handler
    if (!authorizationHeader) {
        return
    }

    const [authenticationType, token] = authorizationHeader.split(" ")

    // error handler
    if (authenticationType !== "Bearer" || !token) {
        return
    }

    const secretKey = "my_secret_key"
    const tokenPayload = JWT.verify(token, secretKey) as JwtPayload

    // error handler
    if (typeof tokenPayload !== "object" || !tokenPayload.sub) {
        return
    }

    const user = {
        uuid: tokenPayload.sub,
        username: tokenPayload.username
    } as User

    req.user = user
    next()
}