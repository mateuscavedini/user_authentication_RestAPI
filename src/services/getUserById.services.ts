import { database } from "../database"
import { User } from "../utils/Models/user.model"

export const getUserById = async (uuid: string): Promise<User> => {
    const values = [uuid]

    const query = `
        SELECT uuid, username FROM application_users
        WHERE uuid = $1
    `

    const {rows} = await database.query<User>(query, values)
    const [user] = rows

    return user
}