import { NextFunction, Request, Response } from "express";
import { getUserByUsernameAndPassword } from "../services/getUserByUsernameAndPassword.services";

export const basicAuthenticationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authorizationHeader = req.headers["authorization"]

    // error handler
    if (!authorizationHeader) {
        return
    }

    const [authenticationType, token] = authorizationHeader.split(" ")

    // error handler
    if (authenticationType !== "Basic" || !token) {
        return
    }

    const tokenContent = Buffer.from(token, "base64").toString("utf-8")
    const [username, password] = tokenContent.split(":")

    const user = await getUserByUsernameAndPassword(username, password)

    // error handler
    if (!user) {
        return
    }

    req.user = user
    next()
}