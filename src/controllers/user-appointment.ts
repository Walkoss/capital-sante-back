import {Request, Response} from 'express';
import * as httpStatus from 'http-status';
import {UserInstance} from '../models/interfaces/user';
import {userService} from '../services/user/user-service';
import {models} from '../models/index';
import {DoctorInstance} from "../models/interfaces/doctor";
import {doctorService} from "../services/doctor/doctor-service";
import {AppointmentInstance} from "../models/interfaces/appointment";
import {appointmentService} from "../services/appointment-service";

namespace UserAppointmentController {
    export async function createAppointment(req: Request, res: Response, next: Function) {
        try {
            if (req.user.id == req.params.userId) {
                let doctor: DoctorInstance = await doctorService.findDoctor(req.body.doctor_id);

                if (doctor) {
                    let appointment: AppointmentInstance = await appointmentService.createAppointment({
                        name: req.body.name,
                        date: req.body.date,
                        notificationId: req.body.notification_id
                    });

                    appointment.setDoctor(doctor);

                    let user: UserInstance = await userService.findUser(req.params.userId);
                    user.addAppointment(appointment);

                    return res.json(appointment);
                } else {
                    res.status(httpStatus.BAD_REQUEST);
                    next('Doctor not found');
                }
            } else {
                res.status(httpStatus.UNAUTHORIZED);
                next('Unauthorized');
            }
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR);
            return next(error);
        }
    }

    export async function getAppointments(req: Request, res: Response, next: Function) {
        try {
            if (req.user.id == req.params.userId) {
                let user: UserInstance = await userService.findUser(req.params.userId);
                let appointments: AppointmentInstance[] = await user.getAppointments({
                    include: [{
                        all: true
                    }],
                });
                res.status(httpStatus.OK).json(appointments);
            } else {
                res.status(httpStatus.UNAUTHORIZED);
                next('Unauhtorized');
            }
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR);
            return next(error);
        }
    }

    export async function deleteAppointment(req: Request, res: Response, next: Function) {
        try {
            if (req.user.id == req.params.userId) {
                let appointment: AppointmentInstance = await appointmentService.findAppointment(req.params.appointmentId);
                await appointment.destroy();
                res.status(httpStatus.NO_CONTENT).end();
            } else {
                res.status(httpStatus.UNAUTHORIZED);
                next('Unauhtorized');
            }
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR);
            return next(error);
        }
    }
}

export = UserAppointmentController;
