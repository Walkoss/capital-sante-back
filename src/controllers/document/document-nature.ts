import {Request, Response} from 'express';
import * as httpStatus from 'http-status';
import {DocumentNatureInstance} from '../../models/interfaces/document-nature';
import {documentNatureService} from '../../services/document/document-nature-service';

namespace DocumentNatureController {
    export async function getDocumentNatures(req: Request, res: Response, next: Function) {
        try {
            let documentNatures: DocumentNatureInstance[] = await documentNatureService.getDocumentNatures();
            res.json(documentNatures);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR);
            return next(error);
        }
    }
}

export = DocumentNatureController;
