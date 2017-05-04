import {Router} from 'express';
import * as passport from 'passport';
import {getDocumentNatures} from "../controllers/document/document-nature";

let router = Router();

router.route('/document-natures')
    .get(passport.authenticate('jwt', {session: false}), getDocumentNatures);

export = router;
