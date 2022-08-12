import { database } from "../database";
import { DatabaseError } from "../utils/models/errors/database.error.model";
import { User } from "../utils/models/user.model";

export const getUserByUsernameAndPassword = async (username: string, password: string): Promise<User | null> => {
    try {
        const values = [username, password]

        const query = `
            SELECT uuid, username
            FROM application_users
            WHERE username = $1
            AND password = crypt($2, 'my_salt')
        `

        const { rows } = await database.query<User>(query, values)
        const [user] = rows

        return user ? user : null
    } catch (error) {
        throw new DatabaseError("Error getting user by username and password", error)
    }

}