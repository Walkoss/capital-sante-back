import * as SequelizeStatic from 'sequelize';
import {DataTypes, Sequelize} from 'sequelize';
import {DocumentAttributes, DocumentInstance} from './interfaces/document';
import {SequelizeModels} from "./index";

export default function (sequelize: Sequelize, dataTypes: DataTypes): SequelizeStatic.Model<DocumentInstance, DocumentAttributes> {
    let Document = sequelize.define<DocumentInstance, DocumentAttributes>('Document', {
        name: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        date: {
            type: dataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        fileUrl: {
            type: dataTypes.STRING,
            allowNull: true
        },
        textContent: {
            type: dataTypes.TEXT,
            allowNull: true
        }
    }, {
        classMethods: {
            associate: (models: SequelizeModels) => {
                Document.belongsTo(models.DocumentSource);
                Document.belongsTo(models.DocumentType);
                Document.belongsTo(models.DocumentNature);
                Document.belongsTo(models.Doctor);
            }
        }, validate: {
            bothFileUrlAndTextContent: function () {
                if ((this.fileUrl === null) && (this.textContent === null)) {
                    throw new Error('Require fileUrl or textContent');
                }
            }
        }
    });

    return Document;
}

