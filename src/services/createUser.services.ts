import { database } from "../database";
import { DatabaseError } from "../utils/models/errors/database.error.model";
import { User } from "../utils/models/user.model";

export const createUser = async (user: User): Promise<User> => {
    try {
        const values = [user.username, user.password]

        const script = `
            INSERT INTO application_users (
                username,
                password
            ) VALUES (
                $1,
                crypt($2, 'my_salt')
            ) RETURNING uuid, username
        `

        const { rows } = await database.query<User>(script, values)
        const [newUser] = rows

        return newUser
    } catch (error) {
        throw new DatabaseError("Error inserting user", error)
    }

}