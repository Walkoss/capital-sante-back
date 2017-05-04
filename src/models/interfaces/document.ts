import {Instance} from 'sequelize';

export interface DocumentAttributes {
    id?: number;
    name: string;
    date: string;
    fileUrl?: string;
    textContent?: string;
}

export interface DocumentInstance extends Instance<DocumentAttributes> {
    dataValues: DocumentAttributes;
}
