import { QueryResult } from "pg";
import { database } from "../database";
import { User } from "../utils/Models/user.model";

export const updateUser = async (user: User): Promise<User> => {
    const values = [user.uuid, user.username, user.password]

    const script = `
        UPDATE application_users
        SET
            username = $2,
            password = crypt($3, 'my_salt')
        WHERE uuid = $1
        RETURNING uuid, username
    `
    const {rows} = await database.query<User>(script, values)
    const [updatedUser] = rows

    return updatedUser
}