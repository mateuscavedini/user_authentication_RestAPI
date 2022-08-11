import { NextFunction } from "express"
import { database } from "../database"
import { MockData } from "../utils/mocks/MockData"
import { MockRequest } from "../utils/mocks/MockRequest"
import { MockResponse } from "../utils/mocks/MockResponse"
import { jwtAuthenticationMiddleware } from "./jwtAuthentication.middleware"

describe("JWT authentication middleware", () => {
    afterAll(async () => {
        await database.query("DELETE FROM application_users")
        await database.end()
    })

    const mockData = new MockData()
    const mockRequest = new MockRequest()
    const mockResponse = new MockResponse()

    it("Should return an user through the request and call 'next'", async () => {
        const mockUser = await mockData.singleUser("default")
        const secretKey = "my_secret_key"
        const mockAuthHeader = mockData.jwtAuthHeader(mockUser.uuid!, mockUser.username, secretKey)

        const request = mockRequest.make({
            headers: mockAuthHeader
        })
        const response = mockResponse.make()
        const next = jest.fn() as NextFunction

        await jwtAuthenticationMiddleware(request, response, next)

        expect(request.user!.uuid).toBeTruthy()
        expect(request.user!.username).toBeTruthy()
        expect(next).toBeCalled()
    })
})