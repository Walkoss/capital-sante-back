import {models, sequelize} from '../../models/index';
import {DoctorTypeAttributes, DoctorTypeInstance} from '../../models/interfaces/doctor-type';
import {Transaction} from 'sequelize';

export class DoctorTypeService {
    findById(id: number): Promise<DoctorTypeInstance> {
        return new Promise<ProductInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models.DoctorType.findById(id).then((doctorType: DoctorTypeInstance) => {
                    resolve(doctorType);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });
    }

    getDoctorTypes(): Promise<Array<DoctorTypeInstance>> {
        return new Promise<Array<DoctorTypeInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models.DoctorType.findAll().then((doctorTypes: Array<DoctorTypeInstance>) => {
                    resolve(doctorTypes);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });
    }
}

export const doctorTypeService = new DoctorTypeService();
