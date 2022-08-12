import { database } from "../database"
import { DatabaseError } from "../utils/models/errors/database.error.model"
import { User } from "../utils/models/user.model"

export const getUserByUuid = async (uuid: string): Promise<User | null> => {
    try {
        const values = [uuid]

        const query = `
            SELECT uuid, username FROM application_users
            WHERE uuid = $1
        `

        const { rows } = await database.query<User>(query, values)
        const [user] = rows

        return user ? user : null
    } catch (error) {
        throw new DatabaseError("Error getting user by uuid", error)
    }
}