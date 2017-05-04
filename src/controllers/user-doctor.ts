import {Request, Response} from 'express';
import * as httpStatus from 'http-status';
import {DoctorInstance} from '../models/interfaces/doctor';
import {doctorService} from '../services/doctor/doctor-service';
import {DoctorTypeInstance} from '../models/interfaces/doctor-type';
import {doctorTypeService} from '../services/doctor/doctor-type-service';
import {UserInstance} from '../models/interfaces/user';
import {userService} from '../services/user/user-service';
import {models} from '../models/index';

namespace UserDoctorController {
    export async function createDoctor(req: Request, res: Response, next: Function) {
        try {
            if (req.user.id == req.params.userId) {
                let doctorType: DoctorTypeInstance = await doctorTypeService.findById(req.body.type_id);

                if (doctorType) {
                    let doctor: DoctorInstance = await doctorService.createDoctor({
                        lastName: req.body.lastName,
                        phone: req.body.phone,
                        address: req.body.address
                    });

                    doctor.setDoctorType(doctorType);

                    let user: UserInstance = await userService.findUser(req.params.userId);
                    user.addDoctor(doctor);

                    return res.json(doctor);
                } else {
                    res.status(httpStatus.BAD_REQUEST);
                    next('DoctorType not found');
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

    export async function getDoctors(req: Request, res: Response, next: Function) {
        try {
            if (req.user.id == req.params.userId) {
                let user: UserInstance = await userService.findUser(req.params.userId);
                let doctors: DoctorInstance[] = await user.getDoctors({
                    // order: [
                    //     ['lastName', 'ASC']
                    // ],
                    include: [{
                        all: true
                    }],
                });
                res.status(httpStatus.OK).json(doctors);
            } else {
                res.status(httpStatus.UNAUTHORIZED);
                next('Unauhtorized');
            }
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR);
            return next(error);
        }
    }

    export async function deleteDoctor(req: Request, res: Response, next: Function) {
        try {
            if (req.user.id == req.params.userId) {
                let doctor: DoctorInstance = await doctorService.findDoctor(req.params.doctorId);
                await doctor.destroy();
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

export = UserDoctorController;
