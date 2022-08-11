import { Request } from "express"
import { Params } from "express-serve-static-core"
import { User } from "../Models/user.model"

interface IMockRequest {
    params?: Params,
    body?: User,
    headers?: Object
}

export class MockRequest {
    make(obj: IMockRequest) {
        const request = {
            params: obj.params || {},
            body: obj.body,
            headers: obj.headers
        } as unknown

        return request as Request
    }
}