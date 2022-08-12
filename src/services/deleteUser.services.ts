import { database } from "../database";
import { DatabaseError } from "../utils/models/errors/database.error.model";
import { User } from "../utils/models/user.model";

export const deleteUser = async (uuid: string): Promise<void> => {
    try {
        const values = [uuid]

        const script = `
            DELETE FROM application_users
            WHERE uuid = $1
            RETURNING uuid, username
        `

        await database.query<User>(script, values)
    } catch (error) {
        throw new DatabaseError("Error deleting user", error)
    }

}