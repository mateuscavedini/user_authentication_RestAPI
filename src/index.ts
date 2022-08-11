import express from "express"
import { jwtAuthenticationMiddleware } from "./middlewares/jwtAuthentication.middleware"
import { authenticationRoutes } from "./routes/authentication.routes"
import { statusRoutes } from "./routes/status.routes"
import { usersRoutes } from "./routes/users.routes"

const server = express()
const host = "http://localhost:"
const port = 3001

// server config
server.use(express.json())
server.use(express.urlencoded({extended: true}))

// routes config
server.use(statusRoutes)
server.use(authenticationRoutes)
server.use(jwtAuthenticationMiddleware)
server.use(usersRoutes)

// server initialization
server.listen(port, () => console.log(`server is running at ${host + port}`))