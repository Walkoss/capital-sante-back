import {databaseConfig, DatabaseConfig} from './database';
import {serverConfig, ServerConfig} from './server';

class Config {
    private _databaseConfig: DatabaseConfig;
    private _serverConfig: ServerConfig;

    constructor() {
        this._databaseConfig = databaseConfig;
        this._serverConfig = serverConfig;
    }

    getDatabaseConfig(): DatabaseConfig {
        return this._databaseConfig;
    }

    getServerConfig(): ServerConfig {
        return this._serverConfig;
    }
}

export const config = new Config();
