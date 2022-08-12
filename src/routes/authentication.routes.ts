import { Router } from "express";
import { AuthenticationController } from "../controllers/authentication.controller";
import { basicAuthenticationMiddleware } from "../middlewares/basicAuthentication.middleware";
import { jwtAuthenticationMiddleware } from "../middlewares/jwtAuthentication.middleware";

export const authenticationRoutes = Router()

const authenticationController = new AuthenticationController()

// get JWT token
authenticationRoutes.post("/token", basicAuthenticationMiddleware, authenticationController.getJwtToken)

// validate JWT token
authenticationRoutes.post("/token/validate", jwtAuthenticationMiddleware, authenticationController.validateJwtToken)