import {Instance} from 'sequelize';

export interface DocumentSourceAttributes {
    id?: number;
    label: string;
}

export interface DocumentSourceInstance extends Instance<DocumentSourceAttributes> {
    dataValues: DocumentSourceAttributes;
}
