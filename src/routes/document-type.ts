import {Router} from 'express';
import * as passport from 'passport';
import {getDocumentTypes} from "../controllers/document/document-type";

let router = Router();

router.route('/document-types')
    .get(passport.authenticate('jwt', {session: false}), getDocumentTypes);

export = router;
