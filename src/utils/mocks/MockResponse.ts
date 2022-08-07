import { Response } from "express";

interface IMockResponse extends Response {
    state: {
        status?: number,
        json?: Object
    }
}

export class MockResponse {
    make(): IMockResponse {
        const response = {
            state: {}
        } as IMockResponse

        response.status = (status: number) => {
            response.state.status = status
            return response
        }

        response.json = (json: Object) => {
            response.state.json = json
            return response
        }

        return response
    }
}