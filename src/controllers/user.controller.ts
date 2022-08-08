import { Request, Response } from "express";
import { createUser } from "../services/createUser.services";
import { deleteUser } from "../services/deleteUser.services";
import { getAllUsers } from "../services/getAllUsers.services";
import { getUserById } from "../services/getUserById.services";
import { updateUser } from "../services/updateUser.services";

export class UserController {
    async create(req: Request, res: Response): Promise<Response> {
        const newUser = req.body
        // const uuid = await createUser(newUser)
        const { uuid } = await createUser(newUser)
        return res.status(201).json(uuid)
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        const users = await getAllUsers()
        return res.status(200).json(users)
    }

    async getById(req: Request<{uuid: string}>, res: Response): Promise<Response> {
        const uuid = req.params.uuid
        const user = await getUserById(uuid)

        return res.status(200).json(user)
    }

    async update(req: Request<{uuid: string}>, res: Response): Promise<Response> {
        const uuid = req.params.uuid
        const modifiedUser = req.body
        modifiedUser.uuid = uuid
        const user = await updateUser(modifiedUser)
        return res.status(200).json(user)
    }

    async delete(req: Request<{uuid: string}>, res: Response): Promise<Response> {
        const uuid = req.params.uuid
        await deleteUser(uuid)
        return res.status(200).json({mensagem: `user (${uuid}) deleted`})
    }
}