import { createUser } from "../../services/createUser.services"
import { User } from "../Models/user.model"

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

    basicAuthHeader(): Object {
        const authorizationHeader = "Basic:any_token"
        const header = {
            authorization: authorizationHeader
        }
        return header
    }
    
    encodedToken(username: string, password: string): string {
        const token = `${username}:${password}`
        const encodedToken = Buffer.from(token, "utf-8").toString("base64")
        return encodedToken
    }
}