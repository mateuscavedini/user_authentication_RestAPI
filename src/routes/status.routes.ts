import { Request, Response, Router } from "express";

export const statusRoutes = Router()

statusRoutes.get("/", (req: Request, res: Response): Response => {
    return res.status(200).send("server is running OK")
})