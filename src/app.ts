// Include dependencies
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as debug from 'debug';
import * as getRoutes from 'require-dir';
import * as cors from 'cors';
import * as passport from 'passport';
import {ExtractJwt, Strategy as JwtStrategy, StrategyOptions as JwtStrategyOptions} from 'passport-jwt';
import {Strategy as LocalStrategy} from 'passport-local';

// Error handler service
import {
    development as DevelopmentErrorHandler,
    production as ProductionErrorHandler
} from './services/error-handler';

// Load config
import {config} from './config/config';

// Load models
import {sequelize} from './models';
import {IStrategyOptions} from 'passport-local';
import {userService} from './services/user-service';
import {UserInstance} from './models/interfaces/user';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.initialization();
    }

    initialization(): void {
        this.app.set('port', config.getServerConfig().port);
        this.app.set('env', config.getServerConfig().env);
        this.app.set('secret', config.getServerConfig().secret);

        this.initalizeMiddlewares();
        this.initalizeRoutes();
        this.initializeErrorsMiddlewares();
    }

    initalizeMiddlewares(): void {
        // HTTP request logger middleware (morgan)
        this.app.use(logger('dev'));

        // Cors
        this.app.use(cors());

        // Used to extract body from request
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));

        // Used to secure API
        const jwtOptions: JwtStrategyOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
            secretOrKey: this.app.get('secret')
        };
        const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
            userService.findUser(payload.id).then((user: UserInstance) => {
                if (!user) return done(null, false);
                return done(null, {
                    id: user.dataValues.id,
                    email: user.dataValues.email
                });
            }).catch((err: Error) => {
                return done(err, false);
            });
        });

        passport.use(jwtStrategy);
        this.app.use(passport.initialize());
    }

    initalizeRoutes(): void {
        let routes = getRoutes('./routes');
        Object.keys(routes).forEach(function (routeName) {
            let router: express.Router = require('./routes/' + routeName);
            this.app.use(router);
        }.bind(this));
    }

    initializeErrorsMiddlewares(): void {
        // error handlers
        // catch 404
        this.app.use((req: express.Request, res: express.Response, next: Function) => {
            res.status(404).json({
                error: 'Not found'
            });
        });

        // development error handler - will print stacktrace
        // production error handler - no stacktraces leaked to user
        if (this.app.get('env') === 'development') {
            this.app.use(DevelopmentErrorHandler);
        } else {
            this.app.use(ProductionErrorHandler);
        }
    }

    startServer(): void {
        // https://github.com/suksant/sequelize-typescript-examples/
        sequelize.sync().then(() => {
            this.app.listen(this.app.get('port'), () => {
                debug('Express server listening on port ' + this.app.get('port'));
            }).on('error', err => {
                console.log('Cannot start server, port most likely in use');
                console.log(err);
            });
        });
    }
}

let app = new App();
app.startServer();

export = app;
