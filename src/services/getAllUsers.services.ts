import { database } from "../database"
import { User } from "../utils/Models/user.model"

export const getAllUsers = async (): Promise<User[]> => {
    const query = `
        SELECT uuid, username FROM application_users
    `

    const {rows} = await database.query<User>(query)

    return rows
}