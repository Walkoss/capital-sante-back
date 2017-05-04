import * as SequelizeStatic from 'sequelize';
import {DataTypes, Sequelize} from 'sequelize';
import {DocumentSourceAttributes, DocumentSourceInstance} from './interfaces/document-source';

export default function (sequelize: Sequelize, dataTypes: DataTypes): SequelizeStatic.Model<DocumentSourceInstance, DocumentSourceAttributes> {
    let DocumentSource = sequelize.define<DocumentSourceInstance, DocumentSourceAttributes>('DocumentSource', {
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

    return DocumentSource;
}
