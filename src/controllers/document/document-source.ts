import {Request, Response} from 'express';
import * as httpStatus from 'http-status';
import {DocumentSourceInstance} from '../../models/interfaces/document-source';
import {documentSourceService} from "../../services/document/document-source-service";

namespace DocumentSourceController {
    export async function getDocumentSources(req: Request, res: Response, next: Function) {
        try {
            let documentSources: DocumentSourceInstance[] = await documentSourceService.getDocumentSources();
            res.json(documentSources);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR);
            return next(error);
        }
    }
}

export = DocumentSourceController;
