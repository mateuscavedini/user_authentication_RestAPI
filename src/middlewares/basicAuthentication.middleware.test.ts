import { NextFunction } from "express"
import { database } from "../database"
import { MockData } from "../utils/mocks/MockData"
import { MockRequest } from "../utils/mocks/MockRequest"
import { MockResponse } from "../utils/mocks/MockResponse"
import { User } from "../utils/models/user.model"
import { basicAuthenticationMiddleware } from "./basicAuthentication.middleware"

// fixes typechecking in request.user!.*
declare module "express-serve-static-core" {
    interface Request {
        user?: User | null
    }
}

describe("Basic authentication middleware", () => {
    afterAll(async () => {
        await database.query("DELETE FROM application_users")
        await database.end()
    })

    const mockData = new MockData()
    const mockRequest = new MockRequest()
    const mockResponse = new MockResponse()

    it("Should return an user through the request and call 'next'", async () => {
        const { password: mockPassword } = mockData.mockUser("default")
        const mockUser = await mockData.singleUser("default")
        mockUser.password = mockPassword
        const mockAuthHeader = mockData.basicAuthHeader(mockUser.username, mockUser.password!)

        const request = mockRequest.make({
            headers: mockAuthHeader
        })
        const response = mockResponse.make()
        const next = jest.fn() as NextFunction

        await basicAuthenticationMiddleware(request, response, next)

        expect(request.user!.uuid).toBeTruthy()
        expect(request.user!.username).toBeTruthy()
        expect(next).toBeCalled()
    })
})