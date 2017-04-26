import * as joi from 'joi';

const envVarsSchema = joi.object({
    MYSQL_HOST: joi.string(),
    MYSQL_ROOT_PASSWORD: joi.string(),
    MYSQL_DATABASE: joi.string()
}).unknown().required();

const {error, value: envVars} = joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export interface DatabaseConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: string;
    timezone: string;
    force: boolean;
}

export const databaseConfig: DatabaseConfig = {
    username: 'root',
    password: envVars.MYSQL_ROOT_PASSWORD,
    database: envVars.MYSQL_DATABASE,
    host: envVars.MYSQL_HOST,
    port: 3306,
    dialect: 'mysql',
    timezone: '+00:00',
    force: false
};
