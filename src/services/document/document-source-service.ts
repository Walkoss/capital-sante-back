import {models, sequelize} from '../../models/index';
import {DocumentSourceInstance} from '../../models/interfaces/document-source';
import {Transaction} from 'sequelize';

export class DocumentSourceService {

    getDocumentSources(): Promise<Array<DocumentSourceInstance>> {
        return new Promise<Array<DocumentSourceInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models.DocumentSource.findAll().then((documentSources: Array<DocumentSourceInstance>) => {
                    resolve(documentSources);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });
    }

    findDocumentSource(id: number): Promise<DocumentSourceInstance> {
        return new Promise<DocumentSourceInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models.DocumentSource.findById(id).then((documentSource: DocumentSourceInstance) => {
                    resolve(documentSource);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });
    }
}

export const documentSourceService = new DocumentSourceService();
