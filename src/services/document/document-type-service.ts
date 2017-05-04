import {models, sequelize} from '../../models/index';
import {DocumentTypeInstance} from '../../models/interfaces/document-type';
import {Transaction} from 'sequelize';

export class DocumentTypeService {

    getDocumentTypes(): Promise<Array<DocumentTypeInstance>> {
        return new Promise<Array<DocumentTypeInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models.DocumentType.findAll().then((documentTypes: Array<DocumentTypeInstance>) => {
                    resolve(documentTypes);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });
    }

    findDocumentType(id: number): Promise<DocumentTypeInstance> {
        return new Promise<DocumentTypeInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models.DocumentType.findById(id).then((documentType: DocumentTypeInstance) => {
                    resolve(documentType);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });
    }
}

export const documentTypeService = new DocumentTypeService();
