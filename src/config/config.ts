import {config} from 'dotenv'
import mysql from 'mysql2'
config()

export const crmHeaders={
    'Content-Type':'application/json',
    'Authorization':`Token token=${process.env.FRESHWORKS_API_KEY}`
}

export const dbPool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"vikas",
    database:"contacts"
    // waitForConnections:true,
    // connectionLimit:10,
    // maxIdle:10,
    // idleTimeout:600000,
    // queueLimit:0

}).promise()