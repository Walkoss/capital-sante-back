import {Router} from 'express';
import {getDoctorTypes} from '../controllers/doctor-type';
import * as passport from 'passport';

let router = Router();

router.route('/doctor-types')
    .get(passport.authenticate('jwt', {session: false}), getDoctorTypes);

export = router;
