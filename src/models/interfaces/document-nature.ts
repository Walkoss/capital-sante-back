import {Instance} from 'sequelize';

export interface DocumentNatureAttributes {
    id?: number;
    label: string;
}

export interface DocumentNatureInstance extends Instance<DocumentNatureAttributes> {
    dataValues: DocumentNatureAttributes;
}
