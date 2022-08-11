import { NextFunction } from "express"
import { database } from "../database"
import { MockRequest } from "../utils/mocks/MockRequest"
import { MockResponse } from "../utils/mocks/MockResponse"
import { DatabaseError } from "../utils/Models/errors/database.error.model"
import { ForbiddenError } from "../utils/Models/errors/forbidden.error.model"
import { errorHandler } from "./errorHandler.middleware"

describe("Error handler middleware", () => {
    afterAll(async () => {
        await database.query("DELETE FROM application_users")
        await database.end()
    })

    const mockRequest = new MockRequest()
    const mockResponse = new MockResponse()
    const next = jest.fn() as NextFunction

    it("Should return status 400 when a DatabaseError is thrown", () => {
        const request = mockRequest.make({})
        const response = mockResponse.make()

        try {
            throw new DatabaseError("Database error")
        } catch (error) {
            errorHandler(error, request, response, next)
        }

        expect(response.state.status).toBe(400)
    })

    it("Should return status 403 when a ForbiddenError is thrown", () => {
        const request = mockRequest.make({})
        const response = mockResponse.make()

        try {
            throw new ForbiddenError("Forbidden error")
        } catch (error) {
            errorHandler(error, request, response, next)
        }

        expect(response.state.status).toBe(403)
    })

    it("Should return status 500 when any other error is thrown", () => {
        const request = mockRequest.make({})
        const response = mockResponse.make()

        try {
            throw new Error("Any other error -> Internal Server error")
        } catch (error) {
            errorHandler(error, request, response, next)
        }

        expect(response.state.status).toBe(500)
    })
})