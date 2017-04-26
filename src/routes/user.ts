import {Router} from 'express';
import {createUser} from '../controllers/user';
import * as joi from 'joi';
import * as validate from 'express-validation';

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
    .post(validate(validations.createUser), createUser);

export = router;
