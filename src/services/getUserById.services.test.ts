import { database } from "../database"
import { MockData } from "../utils/mocks/MockData"
import { getUserById } from "./getUserById.services"

describe("Get user by ID", () => {
    afterAll(async () => {
        await database.query("DELETE FROM application_users")
        await database.end()
    })

    const mockData = new MockData()

    it("Should return an user", async () => {
        const mockUser = await mockData.singleUser()
        const result = await getUserById(mockUser.uuid!)

        const expectedResult = {
            uuid: expect.any(String),
            username: "mock_user"
        }

        expect(result).toMatchObject(expectedResult)
    })
})