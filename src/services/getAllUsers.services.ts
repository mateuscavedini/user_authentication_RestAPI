import { database } from "../database"
import { DatabaseError } from "../utils/Models/errors/database.error.model"
import { User } from "../utils/Models/user.model"

export const getAllUsers = async (): Promise<User[] | null> => {
    try {
        const query = `
            SELECT uuid, username FROM application_users
        `

        const { rows } = await database.query<User>(query)

        return rows ? rows : null
    } catch (error) {
        throw new DatabaseError("Error getting all users", error)
    }

}