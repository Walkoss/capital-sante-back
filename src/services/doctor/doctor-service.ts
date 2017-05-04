import {models, sequelize} from '../../models/index';
import {DoctorAttributes, DoctorInstance} from '../../models/interfaces/doctor';
import {Transaction} from 'sequelize';

export class DoctorService {
    createDoctor(doctorAttributes: DoctorAttributes): Promise<DoctorInstance> {
        return new Promise<DoctorInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models.Doctor.create(doctorAttributes).then((doctor: DoctorInstance) => {
                    resolve(doctor);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });
    }

    findDoctor(id: number): Promise<DoctorInstance> {
        return new Promise<DoctorInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models.Doctor.findById(id).then((doctor: DoctorInstance) => {
                    resolve(doctor);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });
    }
}

export const doctorService = new DoctorService();
