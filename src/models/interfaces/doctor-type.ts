import {Instance} from 'sequelize';

export interface DoctorTypeAttributes {
    id?: number;
    label: string;
}

export interface DoctorTypeInstance extends Instance<DoctorTypeAttributes> {
    dataValues: DoctorTypeAttributes;
}
