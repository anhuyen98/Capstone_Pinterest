import dotenv from 'dotenv';
dotenv.config()

const dbConfig = {
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbPort: process.env.DB_PORT,
    dbDialect: process.env.DB_DIALECT,
}

// console.log(dbConfig) - check 
export default dbConfig