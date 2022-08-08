import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export const usersRoutes = Router()

const userController = new UserController()

usersRoutes.get("/users", userController.getAll)
usersRoutes.get("/users/:uuid", userController.getById)
usersRoutes.post("/users", userController.create)
usersRoutes.put("/users/:uuid", userController.update)
usersRoutes.delete("/users/:uuid", userController.delete)