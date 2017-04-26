import * as joi from 'joi';

const envVarsSchema = joi.object({
    PORT: joi.number().default(3000),
    NODE_ENV: joi.string().allow(['development', 'production']).default('development'),
    SECRET: joi.string()
}).unknown().required();

const {error, value: envVars} = joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export interface ServerConfig {
    port: number;
    env: string;
    secret: string;
}

export const serverConfig: ServerConfig = {
    port: envVars.PORT,
    env: envVars.NODE_ENV,
    secret: envVars.SECRET
};
