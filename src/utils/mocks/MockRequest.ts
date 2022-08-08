import { Request } from "express"
import {Params} from "express-serve-static-core"
import { User } from "../Models/user.model"

interface IMockRequest {
    params?: Params,
    body?: User,
    // user?: User
}

export class MockRequest {
    make(obj: IMockRequest) {
        const request = {
            params: obj.params || {},
            body: obj.body
        } as unknown

        return request as Request
    }
}