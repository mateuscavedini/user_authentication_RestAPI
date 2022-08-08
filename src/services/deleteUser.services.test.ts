import { database } from "../database"
import { MockData } from "../utils/mocks/MockData"
import { deleteUser } from "./deleteUser.services"
import { getUserById } from "./getUserById.services"

describe("Delete user service", () => {
    afterAll(async () => {
        await database.query("DELETE FROM application_users")
        await database.end()
    })

    const mockData = new MockData()

    it("Should delete the specified user", async () => {
        const mockUser = await mockData.singleUser()

        await deleteUser(mockUser.uuid!)

        const result = await getUserById(mockUser.uuid!) // tries to get the deleted user

        expect(result).toBe(undefined)
    })
})