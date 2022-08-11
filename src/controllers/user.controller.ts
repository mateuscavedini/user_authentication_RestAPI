import { NextFunction, Request, Response } from "express";
import { createUser } from "../services/createUser.services";
import { deleteUser } from "../services/deleteUser.services";
import { getAllUsers } from "../services/getAllUsers.services";
import { getUserByUuid } from "../services/getUserByUuid.services";
import { updateUser } from "../services/updateUser.services";

export class UserController {
    async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const newUser = req.body
            const { uuid } = await createUser(newUser)
            return res.status(201).json(uuid)
        } catch (error) {
            return next(error)
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const users = await getAllUsers()
            return res.status(200).json(users)
        } catch (error) {
            return next(error)
        }
    }

    async getByUuid(req: Request<{ uuid: string }>, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const uuid = req.params.uuid
            const user = await getUserByUuid(uuid)

            return res.status(200).json(user)
        } catch (error) {
            return next(error)
        }
    }

    async update(req: Request<{ uuid: string }>, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const uuid = req.params.uuid
            const modifiedUser = req.body
            modifiedUser.uuid = uuid
            const user = await updateUser(modifiedUser)

            return res.status(200).json(user)
        } catch (error) {
            return next(error)
        }
    }

    async delete(req: Request<{ uuid: string }>, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const uuid = req.params.uuid
            await deleteUser(uuid)

            return res.status(200).json({ mensagem: `user (${uuid}) deleted` })
        } catch (error) {
            return next(error)
        }
    }
}