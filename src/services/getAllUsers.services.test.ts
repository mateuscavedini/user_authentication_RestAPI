import { database } from "../database"
import { MockData } from "../utils/mocks/MockData"
import { getAllUsers } from "./getAllUsers.services"
import {User} from "../utils/Models/user.model"

describe("Get all users service", () => {
    afterAll(async () => {
        await database.query("DELETE FROM application_users")
        await database.end()
    })

    const mockData = new MockData()

    it("Should return an array with all users from database", async () => {
        await mockData.multipleUsers()

        const result = await getAllUsers()

        const expectedResult = [
            {
                username: "mock_user"
            },
            {
                username: "mock_user_alt"
            }
        ]

        expect(result).toMatchObject(expectedResult)
    })
})