import { createUser } from "../../services/createUser.services"
import { User } from "../Models/user.model"

export class MockData {
    mockUser(): User {
        const user = {
            username: "mock_user",
            password: "123456"
        }

        return user
    }
    
    async user(): Promise<User> {
        // const mockUser = {
        //     username: "mock_user",
        //     password: "123456"
        // } as User

        const mockUser = this.mockUser()

        const user = await createUser(mockUser)

        return user
    }
}