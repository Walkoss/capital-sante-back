import {Router} from 'express';
import {login} from '../controllers/auth';
import * as joi from 'joi';
import * as validate from 'express-validation';
import * as passport from 'passport';

const validations = {
    login: {
        body: {
            email: joi.string().required(),
            password: joi.string().required()
        }
    }
};

let router = Router();

router.post('/login', validate(validations.login), login);

export = router;
