import JWT, { SignOptions } from "jsonwebtoken"
import { createUser } from "../../services/createUser.services"
import { User } from "../models/user.model"

type MockUserBehavior = "default" | "alternative"

export class MockData {
    mockUser(behavior: MockUserBehavior): User {
        const user = {
            username: "mock_user",
            password: "123456"
        }

        if (behavior === "alternative") {
            user.username += "_alt"
            user.password += "789"
        }

        return user
    }

    async singleUser(behavior: MockUserBehavior): Promise<User> {
        const mockUser = this.mockUser(behavior)

        const user = await createUser(mockUser)

        return user
    }

    async multipleUsers(): Promise<void> {
        const defaultMockUser = this.mockUser("default")
        const alternativeMockUser = this.mockUser("alternative")

        await createUser(defaultMockUser)
        await createUser(alternativeMockUser)
    }

    basicEncodedToken(username: string, password: string): string {
        const token = `${username}:${password}`
        const encodedToken = Buffer.from(token, "utf-8").toString("base64")

        return encodedToken
    }

    jwtEncodedToken(uuid: string, username: string, key: string): string {
        const jwtPayload = { username: username }
        const jwtOptions: SignOptions = { subject: uuid, expiresIn: "5m" }
        const secretKey = key
        const encodedToken = JWT.sign(jwtPayload, secretKey, jwtOptions)

        return encodedToken
    }

    basicAuthHeader(username: string, password: string): Object {
        const token = this.basicEncodedToken(username, password)
        const authorizationHeader = `Basic ${token}`
        const header = {
            authorization: authorizationHeader
        }

        return header
    }

    jwtAuthHeader(uuid: string, username: string, key: string): Object {
        const token = this.jwtEncodedToken(uuid, username, key)
        const authorizationHeader = `Bearer ${token}`
        const header = {
            authorization: authorizationHeader
        }

        return header
    }
}