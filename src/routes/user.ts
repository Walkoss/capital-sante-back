import {Router} from 'express';
import {createUser, getUsers} from '../controllers/user';
import * as joi from 'joi';
import * as validate from 'express-validation';
import * as passport from 'passport';

const validations = {
    createUser: {
        body: {
            email: joi.string().required(),
            password: joi.string().required(),
            firstName: joi.string().required(),
            lastName: joi.string().required()
        }
    }
};

let router = Router();

router.route('/users')
    .post(validate(validations.createUser), createUser)
    .get(passport.authenticate('jwt', {session: false}), getUsers);

export = router;
