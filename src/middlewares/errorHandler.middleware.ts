import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../utils/Models/errors/database.error.model";
import { ForbiddenError } from "../utils/Models/errors/forbidden.error.model";

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): Response => {
    if (error instanceof DatabaseError) {
        return res.sendStatus(400)
    } else if (error instanceof ForbiddenError) {
        return res.sendStatus(403)
    } else {
        return res.sendStatus(500)
    }
}