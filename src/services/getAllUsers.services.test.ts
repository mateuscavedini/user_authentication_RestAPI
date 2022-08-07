import { database } from "../database"
import { MockData } from "../utils/mocks/MockData"

describe("Get all users service", () => {
    afterAll(async () => {
        await database.query("DELETE FROM application_users")
        await database.end()
    })

    const mockData = new MockData()

    it("Should return all users from database", async () => {
        
    })
})