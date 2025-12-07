
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path: path.join(process.cwd(), ".env")})

const config = {
    connection_str: process.env.CONNECTION_STR,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS
    ? Number(process.env.BCRYPT_SALT_ROUNDS)
    : 10,
}

export default config;