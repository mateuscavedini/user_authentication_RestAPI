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
    
    async singleUser(): Promise<User> {
        // const mockUser = {
        //     username: "mock_user",
        //     password: "123456"
        // } as User

        const mockUser = this.mockUser("default")

        const user = await createUser(mockUser)

        return user
    }

    async multipleUsers(): Promise<void> {
        const defaultMockUser = this.mockUser("default")
        const alternativeMockUser = this.mockUser("alternative")

        await createUser(defaultMockUser)
        await createUser(alternativeMockUser)
    }
}