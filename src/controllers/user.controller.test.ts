import { database } from "../database"
import { MockData } from "../utils/mocks/MockData"
import { MockRequest } from "../utils/mocks/MockRequest"
import { MockResponse } from "../utils/mocks/MockResponse"
import { UserController } from "./user.controller"

describe("User controller -> create", () => {
    afterAll(async () => {
        await database.query("DELETE FROM application_users")
        await database.end()
    })

    const userController = new UserController()
    const mockData = new MockData()
    const mockRequest = new MockRequest()
    const mockResponse = new MockResponse()

    test("If userController.create() returns 201 status when user is created", async () => {
        // const request = mockRequest.make({
        //     body: {
        //         username: "mock_user",
        //         password: "123456"
        //     }
        // })

        const mockUser = mockData.mockUser("default")
        const request = mockRequest.make({
            body: mockUser
        })
        const response = mockResponse.make()

        await userController.create(request, response)

        expect(response.state.status).toBe(201)
    })
})