import {Router} from 'express';
import {createAppointment, deleteAppointment, getAppointments} from '../controllers/user-appointment';
import * as joi from 'joi';
import * as validate from 'express-validation';
import * as passport from 'passport';

const validations = {
    createAppointment: {
        body: {
            name: joi.string().required(),
            notification_id: joi.number().required(),
            date: joi.date().required(),
            doctor_id: joi.number().required(),
        }
    }
};

let router = Router();

router.route('/users/:userId/appointments')
    .post(passport.authenticate('jwt', {session: false}), validate(validations.createAppointment), createAppointment)
    .get(passport.authenticate('jwt', {session: false}), getAppointments);

router.route('/users/:userId/appointments/:appointmentId')
    .delete(passport.authenticate('jwt', {session: false}), deleteAppointment);

export = router;
