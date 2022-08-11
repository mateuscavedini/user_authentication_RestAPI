import { NextFunction, Request } from "express"
import { database } from "../database"
import { MockData } from "../utils/mocks/MockData"
import { MockRequest } from "../utils/mocks/MockRequest"
import { MockResponse } from "../utils/mocks/MockResponse"
import { UserController } from "./user.controller"

describe("User controller -> create method", () => {
    afterAll(async () => {
        await database.query("DELETE FROM application_users")
        await database.end()
    })

    const userController = new UserController()
    const mockData = new MockData()
    const mockRequest = new MockRequest()
    const mockResponse = new MockResponse()
    const next = jest.fn() as NextFunction

    test("If userController.create() returns 201 status when user is created", async () => {
        const mockUser = mockData.mockUser("default")
        const request = mockRequest.make({
            body: mockUser
        })
        const response = mockResponse.make()

        await userController.create(request, response, next)

        expect(response.state.status).toBe(201)
    })
})

describe("User controller -> get methods", () => {
    afterAll(async () => {
        await database.query("DELETE FROM application_users")
        await database.end()
    })

    const userController = new UserController()
    const mockData = new MockData()
    const mockRequest = new MockRequest()
    const mockResponse = new MockResponse()
    const next = jest.fn() as NextFunction

    test("If userController.getAll() returns status 200 when getting users list", async () => {
        const request = mockRequest.make({})
        const response = mockResponse.make()

        await userController.getAll(request, response, next)

        expect(response.state.status).toBe(200)
    })

    test("If userController.getById() returns status 200 when getting an user", async () => {
        const mockUser = await mockData.singleUser("default")
        const request = mockRequest.make({
            params: {
                uuid: mockUser.uuid!
            }
        }) as Request<{ uuid: string }>
        const response = mockResponse.make()

        await userController.getByUuid(request, response, next)

        expect(response.state.status).toBe(200)
    })
})

describe("User controller -> updated method", () => {
    afterAll(async () => {
        await database.query("DELETE FROM application_users")
        await database.end()
    })

    const userController = new UserController()
    const mockData = new MockData()
    const mockRequest = new MockRequest()
    const mockResponse = new MockResponse()
    const next = jest.fn() as NextFunction

    test("If userController.update() returns 200 when an user is edited", async () => {
        const mockUser = await mockData.singleUser("default")
        const modifiedUser = {
            username: "new_mock_user",
            password: "654321"
        }

        const request = mockRequest.make({
            params: {
                uuid: mockUser.uuid!
            },
            body: modifiedUser
        }) as Request<{ uuid: string }>
        const response = mockResponse.make()

        await userController.update(request, response, next)

        expect(response.state.status).toBe(200)
    })
})

describe("User controller -> delete method", () => {
    afterAll(async () => {
        await database.query("DELETE FROM application_users")
        await database.end()
    })

    const userController = new UserController()
    const mockData = new MockData()
    const mockRequest = new MockRequest()
    const mockResponse = new MockResponse()
    const next = jest.fn() as NextFunction

    test("If userController.delete() returns status 200 when the specified user is deleted", async () => {
        const mockUser = await mockData.singleUser("default")
        const request = mockRequest.make({
            params: {
                uuid: mockUser.uuid!
            }
        }) as Request<{ uuid: string }>
        const response = mockResponse.make()

        await userController.delete(request, response, next)

        expect(response.state.status).toBe(200)
    })
})