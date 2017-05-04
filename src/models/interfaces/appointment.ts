import {Instance} from 'sequelize';

export interface AppointmentAttributes {
    id?: number;
    name: string;
    notificationId: number;
    date: Date;
}

export interface AppointmentInstance extends Instance<AppointmentAttributes> {
    dataValues: AppointmentAttributes;
}
