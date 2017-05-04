import {Request, Response} from 'express';
import * as httpStatus from 'http-status';
import {DocumentTypeInstance} from '../../models/interfaces/document-type';
import {documentTypeService} from "../../services/document/document-type-service";

namespace DocumentTypeController {
    export async function getDocumentTypes(req: Request, res: Response, next: Function) {
        try {
            let documentTypes: DocumentTypeInstance[] = await documentTypeService.getDocumentTypes();
            res.json(documentTypes);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR);
            return next(error);
        }
    }
}

export = DocumentTypeController;
