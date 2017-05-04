import * as cls from 'continuation-local-storage';
import * as fs from 'fs';
import * as path from 'path';
import * as SequelizeStatic from 'sequelize';
import {config} from '../config/config';
import {Sequelize} from 'sequelize';

// Models
import {UserAttributes, UserInstance} from './interfaces/user';
import {DoctorTypeAttributes, DoctorTypeInstance} from './interfaces/doctor-type';
import {DoctorAttributes, DoctorInstance} from './interfaces/doctor';
import {DocumentTypeAttributes, DocumentTypeInstance} from './interfaces/document-type';
import {DocumentNatureAttributes, DocumentNatureInstance} from './interfaces/document-nature';
import {DocumentSourceAttributes, DocumentSourceInstance} from './interfaces/document-source';
import {DocumentAttributes, DocumentInstance} from './interfaces/document';
import {AppointmentAttributes, AppointmentInstance} from "./interfaces/appointment";

export interface SequelizeModels {
    User: SequelizeStatic.Model<UserInstance, UserAttributes>;
    DoctorType: SequelizeStatic.Model<DoctorTypeInstance, DoctorTypeAttributes>;
    Doctor: SequelizeStatic.Model<DoctorInstance, DoctorAttributes>;
    DocumentType: SequelizeStatic.Model<DocumentTypeInstance, DocumentTypeAttributes>;
    DocumentNature: SequelizeStatic.Model<DocumentNatureInstance, DocumentNatureAttributes>;
    DocumentSource: SequelizeStatic.Model<DocumentSourceInstance, DocumentSourceAttributes>;
    Document: SequelizeStatic.Model<DocumentInstance, DocumentAttributes>;
    Appointment: SequelizeStatic.Model<AppointmentInstance, AppointmentAttributes>;
}

class Database {
    private _basename: string;
    private _models: SequelizeModels;
    private _sequelize: Sequelize;

    constructor() {
        this._basename = path.basename(module.filename);
        let dbConfig = config.getDatabaseConfig();

        (SequelizeStatic as any).cls = cls.createNamespace('sequelize-transaction');
        this._sequelize = new SequelizeStatic(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
        this._models = ({} as any);

        fs.readdirSync(__dirname).filter((file: string) => {
            return (file !== this._basename) && (file !== 'interfaces');
        }).forEach((file: string) => {
            let model = this._sequelize.import(path.join(__dirname, file));
            this._models[(model as any).name] = model;
        });

        Object.keys(this._models).forEach((modelName: string) => {
            if (typeof this._models[modelName].associate === 'function') {
                this._models[modelName].associate(this._models);
            }
        });
    }

    getModels() {
        return this._models;
    }

    getSequelize() {
        return this._sequelize;
    }
}

const database = new Database();
export const models = database.getModels();
export const sequelize = database.getSequelize();
