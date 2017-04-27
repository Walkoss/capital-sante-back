import {Instance} from 'sequelize';

export interface UserAttributes {
    id?: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface UserInstance extends Instance<UserAttributes> {
    authenticate: Function;
    setSite: Function;
    dataValues: UserAttributes;
}
