import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
    jwt: {
        secret: process.env.JWT_SECRET,
        secret_expire: process.env.JWT_EXPIRES_IN,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        refresh_secret_expire: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    token: process.env.USER_TOKEN,
};
