import * as SequelizeStatic from 'sequelize';
import {DataTypes, Sequelize} from 'sequelize';
import {DocumentNatureAttributes, DocumentNatureInstance} from './interfaces/document-nature';

export default function (sequelize: Sequelize, dataTypes: DataTypes): SequelizeStatic.Model<DocumentNatureInstance, DocumentNatureAttributes> {
    let DocumentNature = sequelize.define<DocumentNatureInstance, DocumentNatureAttributes>('DocumentNature', {
        label: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        timestamps: false
    });

    return DocumentNature;
}
