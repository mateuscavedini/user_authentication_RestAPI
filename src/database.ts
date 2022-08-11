import { Pool } from "pg"

const connection = ""
const testConnection = ""

const connectionString = process.env.NODE_ENV === "test" ? testConnection : connection

export const database = new Pool({ connectionString })