import { database } from "../database"
import { MockData } from "../utils/mocks/MockData"
import { createUser } from "./createUser.services"

describe("Create user service", () => {
    afterAll(async () => {
        await database.query("DELETE FROM application_users")
        await database.end()
    })

    const mockData = new MockData()

    it("Should create an user and give it an uuid", async () => {
        // const mockUser = {
        //     username: "mock_user",
        //     password: "123456"
        // }

        const mockUser = mockData.mockUser("default")

        const result = await createUser(mockUser)

        expect(result).toHaveProperty("uuid")
    })
})