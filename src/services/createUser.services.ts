import { database } from "../database";
import { User } from "../utils/Models/user.model";

export const createUser = async (user: User) => {
    const values = [user.username, user.password]

    const script = `
        INSERT INTO application_users (
            username,
            password
        ) VALUES (
            $1,
            crypt($2, 'my_salt')
        ) RETURNING uuid
    `

    const {rows} = await database.query(script, values)
    const [newUser] = rows

    // return newUser.uuid
    return newUser
}