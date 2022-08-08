import { Request, Response } from "express";
import { createUser } from "../services/createUser.services";
import { getAllUsers } from "../services/getAllUsers.services";
import { getUserById } from "../services/getUserById.services";

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
}