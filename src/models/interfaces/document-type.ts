import {Instance} from 'sequelize';

export interface DocumentTypeAttributes {
    id?: number;
    label: string;
}

export interface DocumentTypeInstance extends Instance<DocumentTypeAttributes> {
    dataValues: DocumentTypeAttributes;
}
