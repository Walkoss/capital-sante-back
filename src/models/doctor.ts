import * as SequelizeStatic from 'sequelize';
import {DataTypes, Sequelize} from 'sequelize';
import {DoctorAttributes, DoctorInstance} from './interfaces/doctor';
import {SequelizeModels} from "./index";

export default function (sequelize: Sequelize, dataTypes: DataTypes): SequelizeStatic.Model<DoctorInstance, DoctorAttributes> {
    let Doctor = sequelize.define<DoctorInstance, DoctorAttributes>('Doctor', {
        lastName: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        phone: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        address: {
            type: dataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        classMethods: {
            associate: (models: SequelizeModels) => {
                Doctor.belongsTo(models.DoctorType);
            }
        }
    });

    return Doctor;
}
