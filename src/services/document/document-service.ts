import {models, sequelize} from '../../models/index';
import {DocumentAttributes, DocumentInstance} from '../../models/interfaces/document';
import {Transaction} from 'sequelize';

export class DocumentService {
    createDocument(documentAttributes: DocumentAttributes): Promise<DocumentInstance> {
        return new Promise<DocumentInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models.Document.create(documentAttributes).then((document: DocumentInstance) => {
                    resolve(document);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });
    }

    findDocument(id: number): Promise<DocumentInstance> {
        return new Promise<DocumentInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models.Document.findById(id).then((document: DocumentInstance) => {
                    resolve(document);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });
    }
}

export const documentService = new DocumentService();
