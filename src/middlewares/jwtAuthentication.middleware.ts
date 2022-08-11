import { NextFunction, Request, Response } from "express";
import JWT, { JwtPayload } from "jsonwebtoken";
import { ForbiddenError } from "../utils/Models/errors/forbidden.error.model";
import { User } from "../utils/Models/user.model";

export const jwtAuthenticationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authorizationHeader = req.headers["authorization"]

        if (!authorizationHeader) {
            throw new ForbiddenError("Credentials not found")
        }

        const [authorizationType, token] = authorizationHeader.split(" ")

        if (authorizationType !== "Bearer") {
            throw new ForbiddenError("Invalid authorization type")
        }

        if (!token) {
            throw new ForbiddenError("Invalid token")
        }

        try {
            const secretKey = "my_secret_key"
            const tokenPayload = JWT.verify(token, secretKey) as JwtPayload

            if (typeof tokenPayload !== "object" || !tokenPayload.sub) {
                throw new ForbiddenError("Invalid token")
            }

            const user = {
                uuid: tokenPayload.sub,
                username: tokenPayload.username
            } as User

            req.user = user

            return next()
        } catch (error) {
            throw new ForbiddenError("Invalid token")
        }
    } catch (error) {
        return next(error)
    }

}