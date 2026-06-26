import 'dotenv/config'
import env from 'env-var';

export const config = {
    jwtSecret: env.get('JWT_SECRET').required().asString(),
    port: env.get('PORT').required().asPortNumber(),
     db: {
        host: env.get('DB_HOST').required().asString(),
        port: env.get('DB_PORT').required().asPortNumber(),
        user: env.get('DB_USER').required().asString(),
        password: env.get('DB_PASSWORD').required().asString(),
        database: env.get('DB_NAME').required().asString(),

    }
}