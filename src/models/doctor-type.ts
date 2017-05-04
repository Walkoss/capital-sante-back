import * as SequelizeStatic from 'sequelize';
import {DataTypes, Sequelize} from 'sequelize';
import {DoctorTypeAttributes, DoctorTypeInstance} from './interfaces/doctor-type';

export default function (sequelize: Sequelize, dataTypes: DataTypes): SequelizeStatic.Model<DoctorTypeInstance, DoctorTypeAttributes> {
    let DoctorType = sequelize.define<DoctorTypeInstance, DoctorTypeAttributes>('DoctorType', {
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

    return DoctorType;
}
