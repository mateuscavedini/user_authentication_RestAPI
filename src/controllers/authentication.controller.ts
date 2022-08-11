import { NextFunction, Request, Response } from "express";
import JWT, { JwtPayload, SignOptions } from "jsonwebtoken";

export class AuthenticationController {
    getJwtToken(req: Request, res: Response, next: NextFunction): Response | void {
        try {
            const user = req.user! // user was checked in the basicAuthentication middleware
            const jwtPayload: JwtPayload = {
                username: user.username
            }
            const secretKey = "my_secret_key"
            const jwtOptions: SignOptions = {
                subject: user.uuid,
                expiresIn: "5m"
            }
            const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions)

            return res.status(200).json({ token: jwt })
        } catch (error) {
            next(error)
        }

    }

    validateJwtToken(req: Request, res: Response, next: NextFunction): Response | void {
        try {
            // token gets validated by the jwtAuthenticationMiddleware
            return res.status(200).json({ message: "Token is valid" })
        } catch (error) {
            next(error)
        }
    }
}