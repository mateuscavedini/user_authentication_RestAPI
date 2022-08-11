import { database } from "../database"
import { MockData } from "../utils/mocks/MockData"
import { getUserByUuid } from "./getUserByUuid.services"

describe("Get user by ID service", () => {
    afterAll(async () => {
        await database.query("DELETE FROM application_users")
        await database.end()
    })

    const mockData = new MockData()

    it("Should return an user", async () => {
        const mockUser = await mockData.singleUser("default")
        const result = await getUserByUuid(mockUser.uuid!)

        const expectedResult = {
            uuid: expect.any(String),
            username: "mock_user"
        }

        expect(result).toMatchObject(expectedResult)
    })
})