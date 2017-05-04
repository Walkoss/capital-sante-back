import * as SequelizeStatic from 'sequelize';
import {DataTypes, Sequelize} from 'sequelize';
import {UserAttributes, UserInstance} from './interfaces/user';
import * as bcrypt from 'bcrypt';
import {SequelizeModels} from "./index";

export default function (sequelize: Sequelize, dataTypes: DataTypes): SequelizeStatic.Model<UserInstance, UserAttributes> {
    let User = sequelize.define<UserInstance, UserAttributes>('User', {
        email: {
            type: dataTypes.STRING,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'badEmailFormat'
                },
                notEmpty: true
            },
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        firstName: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        lastName: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        resetPasswordToken: {
            type: dataTypes.TEXT
        }
    }, {
        instanceMethods: {
            authenticate: function (password: string, cb: Function) {
                bcrypt.compare(password, this.password, (err: Error, isMatch: boolean) => {
                    if (err) return cb(err);
                    cb(null, isMatch);
                });
            }
        },
        classMethods: {
            associate: (models: SequelizeModels) => {
                User.belongsToMany(models.Doctor, {through: 'UserDoctors'});
                User.belongsToMany(models.Document, {through: 'UserDocuments'});
                User.belongsToMany(models.Appointment, {through: 'UserAppointments'});
            }
        }
    });

    let hasSecurePassword = (user: UserInstance, options: Object, callback: Function) => {
        bcrypt.hash(user.get('password'), 10, (err: Error, hash: string) => {
            if (err)
                return callback(err);
            user.set('password', hash);
            return callback(null, options);
        });
    };

    User.beforeCreate((user: UserInstance, options: Object, callback: Function) => {
        user.dataValues.email = user.dataValues.email.toLowerCase();
        if (user.dataValues.password)
            hasSecurePassword(user, options, callback);
        else
            return callback(null, options);
    });

    User.beforeUpdate((user: UserInstance, options: Object, callback: Function) => {
        user.dataValues.email = user.dataValues.email.toLowerCase();
        if (user.dataValues.password)
            hasSecurePassword(user, options, callback);
        else
            return callback(null, options);
    });

    return User;
}
