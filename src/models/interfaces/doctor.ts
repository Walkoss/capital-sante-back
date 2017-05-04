import {Instance} from 'sequelize';

export interface DoctorAttributes {
    id?: number;
    lastName: string;
    phone: string;
    address: string;
}

export interface DoctorInstance extends Instance<DoctorAttributes> {
    dataValues: DoctorAttributes;
}
