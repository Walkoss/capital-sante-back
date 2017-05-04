import {Request, Response} from 'express';
import {userService} from '../services/user/user-service';
import {UserInstance} from '../models/interfaces/user';
import * as httpStatus from 'http-status';

namespace UserController {
    export async function createUser(req: Request, res: Response, next: Function) {
        try {
            let user: UserInstance = await userService.createUser({
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            });
            return res.json(user);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR);
            return next(error);
        }
    }

    export async function getUsers(req: Request, res: Response, next: Function) {
        try {
            let users: UserInstance[] = await userService.getUsers();
            return res.json(users);
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR);
            return next(error);
        }
    }
}

export = UserController;
