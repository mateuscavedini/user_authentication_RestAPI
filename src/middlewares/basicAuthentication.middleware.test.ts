import { database } from "../database"
import { getUserByUsernameAndPassword } from "../services/getUserByUsernameAndPassword.services"
import { MockData } from "../utils/mocks/MockData"
import { MockRequest } from "../utils/mocks/MockRequest"

describe("Basic authentication middleware", () => {
    afterAll(async () => {
        await database.query("DELETE FROM application_users")
        await database.end()
    })

    const mockData = new MockData()
    const mockRequest = new MockRequest()

    it("Should receive a basic token through the request headers", async() => {
        const { password: mockPassword } = mockData.mockUser("default")
        const mockUser = await mockData.singleUser()
        mockUser.password = mockPassword
        const mockAuthHeader = mockData.basicAuthHeader()

        const request = mockRequest.make({
            body: mockUser,
            headers: mockAuthHeader
        })

        const authorizationHeader = request.headers["authorization"]
        const [authenticationType, token] = authorizationHeader!.split(":")

        expect(authenticationType).toBe("Basic")
        expect(typeof token).toBe("string")
    })
    
    it("Should decode a base64 token and return an user", async () => {
        const { password: mockPassword } = mockData.mockUser("default")
        const mockUser = await mockData.singleUser()
        mockUser.password = mockPassword

        const token = mockData.encodedToken(mockUser.username, mockUser.password!)
        const decodedToken = Buffer.from(token, "base64").toString("utf-8")
        const [username, password] = decodedToken.split(":")

        const result = await getUserByUsernameAndPassword(username, password)

        expect(decodedToken).toBe(`${mockUser.username}:${mockUser.password}`)
        // expect(request.user).toBe(mockUser)
        expect(result.uuid).toBe(mockUser.uuid)
        expect(result.username).toBe(mockUser.username)
    })
})