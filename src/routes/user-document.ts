import {Router} from 'express';
import {createDocument, getDocuments, deleteDocument} from '../controllers/user-document';
import * as joi from 'joi';
import * as validate from 'express-validation';
import * as passport from 'passport';

const validations = {
    createDocument: {
        body: {
            name: joi.string().required(),
            date: joi.date().required(),
            fileUrl: joi.string().default(null),
            documentSourceId: joi.number().required(),
            documentNatureId: joi.number().required(),
            documentTypeId: joi.number().required(),
            doctorId: joi.number().required(),
            textContent: joi.string().default(null),
        }
    }
};

let router = Router();

router.route('/users/:userId/documents')
    .post(passport.authenticate('jwt', {session: false}), validate(validations.createDocument), createDocument)
    .get(passport.authenticate('jwt', {session: false}), getDocuments);

router.route('/users/:userId/documents/:documentId')
    .delete(passport.authenticate('jwt', {session: false}), deleteDocument);

export = router;
