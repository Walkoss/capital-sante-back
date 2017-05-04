import {Router} from 'express';
import {createDoctor, deleteDoctor, getDoctors} from '../controllers/user-doctor';
import * as joi from 'joi';
import * as validate from 'express-validation';
import * as passport from 'passport';

const validations = {
    createDoctor: {
        body: {
            lastName: joi.string().required(),
            phone: joi.string().required(),
            address: joi.string().required(),
            type_id: joi.number().required(),
        }
    }
};

let router = Router();

router.route('/users/:userId/doctors')
    .post(passport.authenticate('jwt', {session: false}), validate(validations.createDoctor), createDoctor)
    .get(passport.authenticate('jwt', {session: false}), getDoctors);

router.route('/users/:userId/doctors/:doctorId')
    .delete(passport.authenticate('jwt', {session: false}), deleteDoctor);

export = router;
