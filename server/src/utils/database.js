import pg from 'pg'
const { Pool } = pg

const { USER, HOST, DB, PASSWD, PORT } = process.env

export const pool = new Pool({
  user: USER,
  host: HOST,
  database: DB,
  password: PASSWD,
  port: PORT
});