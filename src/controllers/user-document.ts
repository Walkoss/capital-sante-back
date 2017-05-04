import {Request, Response} from 'express';
import * as httpStatus from 'http-status';
import {UserInstance} from "../models/interfaces/user";
import {userService} from "../services/user/user-service";
import {DoctorInstance} from "../models/interfaces/doctor";
import {doctorService} from "../services/doctor/doctor-service";
import {DocumentSourceInstance} from "../models/interfaces/document-source";
import {documentSourceService} from "../services/document/document-source-service";
import {DocumentNatureInstance} from "../models/interfaces/document-nature";
import {DocumentTypeInstance} from "../models/interfaces/document-type";
import {documentNatureService} from "../services/document/document-nature-service";
import {documentTypeService} from "../services/document/document-type-service";
import {DocumentInstance} from "../models/interfaces/document";
import {documentService} from "../services/document/document-service";

namespace UserDocumentController {
    export async function createDocument(req: Request, res: Response, next: Function) {
        try {
            if (req.user.id == req.params.userId) {
                console.log(req.body);
                // TODO: check if user contains doctor
                let user: UserInstance = await userService.findUser(req.user.id);
                let doctor: DoctorInstance = await doctorService.findDoctor(req.body.doctorId);
                let documentSource: DocumentSourceInstance = await documentSourceService.findDocumentSource(req.body.documentSourceId);
                let documentNature: DocumentNatureInstance = await documentNatureService.findDocumentNature(req.body.documentNatureId);
                let documentType: DocumentTypeInstance = await documentTypeService.findDocumentType(req.body.documentTypeId);

                let document: DocumentInstance = await documentService.createDocument({
                    name: req.body.name,
                    date: req.body.date,
                    fileUrl: req.body.fileUrl,
                    textContent: req.body.textContent
                });

                document.setDoctor(doctor);
                document.setDocumentSource(documentSource);
                document.setDocumentNature(documentNature);
                document.setDocumentType(documentType);

                user.addDocument(document);

                res.json(document);
            } else {
                res.status(httpStatus.UNAUTHORIZED);
                next('Unauthorized');
            }
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR);
            return next(error);
        }
    }

    export async function getDocuments(req: Request, res: Response, next: Function) {
        try {
            if (req.user.id == req.params.userId) {
                let user: UserInstance = await userService.findUser(req.params.userId);
                let documents: DocumentInstance[] = await user.getDocuments({
                    include: [{
                        all: true
                    }],
                });
                res.status(httpStatus.OK).json(documents);
            } else {
                res.status(httpStatus.UNAUTHORIZED);
                next('Unauhtorized');
            }
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR);
            return next(error);
        }
    }

    export async function deleteDocument(req: Request, res: Response, next: Function) {
        try {
            if (req.user.id == req.params.userId) {
                let document: DocumentInstance = await documentService.findDocument(req.params.documentId);
                await document.destroy();
                res.status(httpStatus.NO_CONTENT).end();
            } else {
                res.status(httpStatus.UNAUTHORIZED);
                next('Unauhtorized');
            }
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR);
            return next(error);
        }
    }
}

export = UserDocumentController;
