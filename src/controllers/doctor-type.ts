import {Request, Response} from 'express';
import * as httpStatus from 'http-status';
import {DoctorTypeInstance} from '../models/interfaces/doctor-type';
import {doctorTypeService} from '../services/doctor/doctor-type-service';

namespace DoctorTypeController {
    export async function getDoctorTypes(req: Request, res: Response, next: Function) {
        try {
            let doctorTypes: DoctorTypeInstance[] = await doctorTypeService.getDoctorTypes();
            res.json(doctorTypes);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR);
            return next(error);
        }
    }
}

export = DoctorTypeController;
