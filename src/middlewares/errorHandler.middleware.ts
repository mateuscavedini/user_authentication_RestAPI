import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../utils/models/errors/database.error.model";
import { ForbiddenError } from "../utils/models/errors/forbidden.error.model";

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): Response => {
    if (error instanceof DatabaseError) {
        return res.sendStatus(400)
    } else if (error instanceof ForbiddenError) {
        return res.sendStatus(403)
    } else {
        return res.sendStatus(500)
    }
}