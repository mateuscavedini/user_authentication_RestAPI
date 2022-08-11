import { NextFunction, Request, Response } from "express";
import JWT, { JwtPayload, SignOptions } from "jsonwebtoken";

export class AuthenticationController {
    getJwtToken(req: Request, res: Response, next: NextFunction): Response {
        const user = req.user

        // error handler
        if (!user) {
            return res.sendStatus(400)
        }

        const jwtPayload: JwtPayload = {
            username: user.username
        }
        const secretKey = "my_secret_key"
        const jwtOptions: SignOptions = {
            subject: user.uuid,
            expiresIn: "5m"
        }

        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions)
        return res.status(200).json({token: jwt})
    }

    validateJwtToken(req: Request, res: Response, next: NextFunction): Response {
        // token gets validated by the jwtAuthenticationMiddleware
        return res.status(200).json({message: "Token is valid"})
    }
}