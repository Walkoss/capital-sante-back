import * as SequelizeStatic from 'sequelize';
import {DataTypes, Sequelize} from 'sequelize';
import {AppointmentAttributes, AppointmentInstance} from './interfaces/appointment';
import {SequelizeModels} from "./index";

export default function (sequelize: Sequelize, dataTypes: DataTypes): SequelizeStatic.Model<AppointmentInstance, AppointmentAttributes> {
    let Appointment = sequelize.define<AppointmentInstance, AppointmentAttributes>('Appointment', {
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
        notificationId: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: (models: SequelizeModels) => {
                Appointment.belongsTo(models.Doctor);
            }
        }
    });

    return Appointment;
}
