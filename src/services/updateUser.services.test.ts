import { database } from "../database"
import { MockData } from "../utils/mocks/MockData"
import { User } from "../utils/Models/user.model"
import { updateUser } from "./updateUser.services"

describe("Update user", () => {
    afterAll(async () => {
        await database.query("DELETE FROM application_users")
        await database.end()
    })

    const mockData = new MockData()

    it("Should update an existing user", async () => {
        const mockUser = await mockData.singleUser()
        const modifiedUser = {
            uuid: mockUser.uuid,
            username: "new_mock_user",
            password: "654321"
        } as User

        const result = await updateUser(modifiedUser)

        expect(result.uuid).toBe(mockUser.uuid!)
        expect(result.username).not.toBe(mockUser.username)
        // with the username updating, it is assumed that the password also updates; the password is not returned from updatedUser
    })
})