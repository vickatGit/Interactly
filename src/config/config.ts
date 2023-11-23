import {config} from 'dotenv'
import mysql from 'mysql2'
config()

export const crmHeaders={
    'Content-Type':'application/json',
    'Authorization':`Token token=${process.env.FRESHWORKS_API_KEY}`
}

// export const dbPool = mysql.createPool({
//     host:process.env.DB_HOST,
//     user:process.env.DB_USERNAME,
//     password:process.env.DB_PASSWORD,
//     database:process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10, // Adjust the limit according to your needs
//     queueLimit: 0,
//     port:process.env.DB_PORT
// }).promise()

export const dbPool = mysql.createPool(process.env.DB_CONNECTION_STRING)