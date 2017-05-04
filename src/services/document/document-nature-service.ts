import {models, sequelize} from '../../models/index';
import {DocumentNatureInstance} from '../../models/interfaces/document-nature';
import {Transaction} from 'sequelize';

export class DocumentNatureService {

    getDocumentNatures(): Promise<Array<DocumentNatureInstance>> {
        return new Promise<Array<DocumentNatureInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models.DocumentNature.findAll().then((documentNatures: Array<DocumentNatureInstance>) => {
                    resolve(documentNatures);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });
    }

    findDocumentNature(id: number): Promise<DocumentNatureInstance> {
        return new Promise<DocumentNatureInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models.DocumentNature.findById(id).then((documentNature: DocumentNatureInstance) => {
                    resolve(documentNature);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });
    }
}

export const documentNatureService = new DocumentNatureService();
