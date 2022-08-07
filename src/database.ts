import { Pool } from "pg"

const prodConnection = "postgres://mzkvrajg:lawehHtlSLdMdPV_fbH2TtN0qtLlpO5S@kesavan.db.elephantsql.com/mzkvrajg"
const testConnection = "postgres://lxawttxs:YSTojIjJleAk9f1ZyEFvGmUTwyCerlhA@kesavan.db.elephantsql.com/lxawttxs"

const connectionString = process.env.NODE_ENV === "test" ? testConnection : prodConnection

export const database = new Pool({ connectionString })