import {Router} from 'express';
import * as passport from 'passport';
import {getDocumentSources} from "../controllers/document/document-source";

let router = Router();

router.route('/document-sources')
    .get(passport.authenticate('jwt', {session: false}), getDocumentSources);

export = router;
