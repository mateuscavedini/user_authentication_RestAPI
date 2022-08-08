import { database } from "../database";
import { User } from "../utils/Models/user.model";

export const getUserByUsernameAndPassword = async (username: string, password: string): Promise<User> => {
    const values = [username, password]

    const query = `
        SELECT uuid, username
        FROM application_users
        WHERE username = $1
        AND password = crypt($2, 'my_salt')
    `

    const {rows} = await database.query<User>(query, values)
    const [user] = rows
    return user
}