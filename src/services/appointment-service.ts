import {AppointmentAttributes, AppointmentInstance} from "../models/interfaces/appointment";
import {models, sequelize} from '../models/index';
import {Transaction} from 'sequelize';

export class AppointmentService {
    createAppointment(appointmentAttributes: AppointmentAttributes): Promise<AppointmentInstance> {
        return new Promise<AppointmentInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models.Appointment.create(appointmentAttributes).then((appointment: AppointmentInstance) => {
                    resolve(appointment);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });
    }

    findAppointment(id: number): Promise<AppointmentInstance> {
        return new Promise<AppointmentInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models.Appointment.findById(id).then((appointment: AppointmentInstance) => {
                    resolve(appointment);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });
    }
}

export const appointmentService = new AppointmentService();
