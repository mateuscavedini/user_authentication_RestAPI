import { NextFunction, Request, Response } from "express";
import { getUserByUsernameAndPassword } from "../services/getUserByUsernameAndPassword.services";
import { ForbiddenError } from "../utils/models/errors/forbidden.error.model";

export const basicAuthenticationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authorizationHeader = req.headers["authorization"]

        if (!authorizationHeader) {
            throw new ForbiddenError("Credentials not found")
        }

        const [authorizationType, token] = authorizationHeader.split(" ")

        if (authorizationType !== "Basic") {
            throw new ForbiddenError("Invalid authorization type")
        }

        if (!token) {
            throw new ForbiddenError("Invalid token")
        }

        const tokenContent = Buffer.from(token, "base64").toString("utf-8")
        const [username, password] = tokenContent.split(":")

        if (!username || !password) {
            throw new ForbiddenError("Credentials not found")
        }

        const user = await getUserByUsernameAndPassword(username, password)

        if (!user) {
            throw new ForbiddenError("Invalid credentials")
        }

        req.user = user

        return next()
    } catch (error) {
        return next(error)
    }

}