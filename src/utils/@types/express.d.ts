import { User } from "../Models/user.model";

declare module "express-serve-static-core" {
    interface Request {
        user?: User
    }
}