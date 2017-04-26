import {Request, Response} from 'express';
import {ValidationError as expressValidationError} from 'express-validation';
import {UniqueConstraintError, ValidationError} from 'sequelize';
import * as httpStatus from 'http-status';

namespace ErrorHandler {

    let handler = (err, req: Request, res: Response, next: Function, includeStackTrace: boolean) => {
        // TODO activityLog
        if (err instanceof expressValidationError) {
            err.message = 'badRequestFormat';
            res.status(err.status);
        } else if (err instanceof UniqueConstraintError || err instanceof ValidationError) {
            err.message = err.errors.map(error => error.message).join(' and ');
            res.status(httpStatus.BAD_REQUEST);
        }

        res.status(res.statusCode || httpStatus.INTERNAL_SERVER_ERROR);
        res.json({
            message: err.message,
            error: includeStackTrace ? err : {}
        });
    };

    /**
     * Error development response
     */
    export function development(err: Error, req: Request, res: Response, next: Function) {
        return handler(err, req, res, next, true);
    }

    /**
     * Error production response
     */
    export function production(err: Error, req: Request, res: Response, next: Function) {
        return handler(err, req, res, next, false);
    }
}

export = ErrorHandler;
