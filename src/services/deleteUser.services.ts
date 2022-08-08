import { database } from "../database";
import { User } from "../utils/Models/user.model";

export const deleteUser = async (uuid: string): Promise<void> => {
    const values = [uuid]

    const script = `
        DELETE FROM application_users
        WHERE uuid = $1
        RETURNING uuid, username
    `

    await database.query<User>(script, values)
}