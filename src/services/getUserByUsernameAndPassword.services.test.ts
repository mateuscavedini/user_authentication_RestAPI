import { database } from "../database"
import { MockData } from "../utils/mocks/MockData"
import { getUserByUsernameAndPassword } from "./getUserByUsernameAndPassword.services"

describe("Get user by username and password service", () => {
    afterAll(async () => {
        await database.query("DELETE FROM application_users")
        await database.end()
    })

    const mockData = new MockData()

    it("Should return the specified user", async () => {
        const mockUser = mockData.mockUser("default")
        const { uuid } = await mockData.singleUser("default")
        mockUser.uuid = uuid

        const result = await getUserByUsernameAndPassword(mockUser.username, mockUser.password!)

        expect(result!.uuid!).toBe(mockUser.uuid)
        expect(result!.username).toBe(mockUser.username)
    })
})