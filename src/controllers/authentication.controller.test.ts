import { database } from "../database"
import { basicAuthenticationMiddleware } from "../middlewares/basicAuthentication.middleware"
import { jwtAuthenticationMiddleware } from "../middlewares/jwtAuthentication.middleware"
import { MockData } from "../utils/mocks/MockData"
import { MockRequest } from "../utils/mocks/MockRequest"
import { MockResponse } from "../utils/mocks/MockResponse"
import { AuthenticationController } from "./authentication.controller"

describe("Authentication controller", () => {
    afterAll(async () => {
        await database.query("DELETE FROM application_users")
        await database.end()
    })

    const authenticationController = new AuthenticationController()
    const mockData = new MockData()
    const mockRequest = new MockRequest()
    const mockResponse = new MockResponse()

    test("If authenticationController.getJwtToken() returns status 200 when getting a JWT token", async () => {
        const { password: mockPassword } = mockData.mockUser("default")
        const mockUser = await mockData.singleUser("default")
        mockUser.password = mockPassword
        const mockAuthHeader = mockData.basicAuthHeader(mockUser.username, mockUser.password!)

        const request = mockRequest.make({
            headers: mockAuthHeader
        })
        const response = mockResponse.make()
        const next = jest.fn()

        await basicAuthenticationMiddleware(request, response, next)
        authenticationController.getJwtToken(request, response, next)

        expect(response.state.status).toBe(200)
    })

    test("If authenticationController.validateJwtToken() returns status 200 when JWT is valid", async () => {
        const mockUser = await mockData.singleUser("alternative")
        const secretKey = "my_secret_key"
        const mockAuthHeader = mockData.jwtAuthHeader(mockUser.uuid!, mockUser.username, secretKey)

        const request = mockRequest.make({
            headers: mockAuthHeader
        })
        const response = mockResponse.make()
        const next = jest.fn()

        await jwtAuthenticationMiddleware(request, response, next)
        authenticationController.validateJwtToken(request, response, next)

        expect(response.state.status).toBe(200)
    })
})