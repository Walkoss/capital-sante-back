import {Request, Response} from 'express';
import {userService} from '../services/user/user-service';
import * as httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import {config} from '../config/config';

namespace AuthController {
    export async function login(req: Request, res: Response, next: Function) {
        try {
            let user = await userService.findUserWithMail(req.body.email);
            if (!user) {
                res.status(httpStatus.UNAUTHORIZED).send({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else {
                user.authenticate(req.body.password, (err, isMatch) => {
                    if (isMatch && !err) {
                        let token = jwt.sign(user.dataValues, config.getServerConfig().secret);
                        res.json({success: true, token: 'JWT ' + token});
                    } else {
                        res.status(httpStatus.UNAUTHORIZED).send({
                            success: false,
                            message: 'Authentication failed. Passwords did not match.'
                        });
                    }
                });
            }
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR);
            return next(error);
        }
    }
}

export = AuthController;
