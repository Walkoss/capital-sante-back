import {models, sequelize} from '../../models/index';
import {UserAttributes, UserInstance} from '../../models/interfaces/user';
import {Transaction} from 'sequelize';

export class UserService {
    createUser(userAttributes: UserAttributes): Promise<UserInstance> {
        return new Promise<UserInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models.User.create(userAttributes).then((user: UserInstance) => {
                    resolve(user);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });
    }

    findUserWithMail(email: string): Promise<UserInstance> {
        return new Promise<UserInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models.User.findOne({
                    where: {
                        email: email
                    }
                }).then((user: UserInstance) => {
                    resolve(user);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });
    }

    findUser(id: number): Promise<UserInstance> {
        return new Promise<UserInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models.User.findById(id).then((user: UserInstance) => {
                    resolve(user);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });
    }

    getUsers(): Promise<Array<UserInstance>> {
        return new Promise<Array<UserInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models.User.findAll().then((users: Array<UserInstance>) => {
                    resolve(users);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });
    }
}

export const userService = new UserService();
