import * as SequelizeStatic from 'sequelize';
import {DataTypes, Sequelize} from 'sequelize';
import {DocumentTypeAttributes, DocumentTypeInstance} from './interfaces/document-type';

export default function (sequelize: Sequelize, dataTypes: DataTypes): SequelizeStatic.Model<DocumentTypeInstance, DocumentTypeAttributes> {
    let DocumentType = sequelize.define<DocumentTypeInstance, DocumentTypeAttributes>('DocumentType', {
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

    return DocumentType;
}
