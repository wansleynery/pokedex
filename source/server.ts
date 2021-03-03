import express, { Express, NextFunction }
    from 'express';
import morgan
    from 'morgan';
import path from 'path';

/*********************************************************************
 * Server Routes Manager
 * 
 * @description Creates an instance of a routes manager
 * @author Wansley Nery Soto
 *********************************************************************/

export default class Server {

    app: Express;
    
    constructor (configFile: { port: number }) {
        this.app = express ();

        this.app.set ('views', './source/views');
        this.app.use (express.static (path.join (__dirname, 'public')));
        this.app.set ('view engine', 'pug');
        this.app.use (
            morgan ('combined', {
                skip: (_request, response) => response.statusCode < 400
            })
        );

        this.start (configFile);
    }

    get (route: string, page: string, data?: any, callback?: NextFunction) {
        this.app.
            route (route).
            get ((_request, response) => {
                response.render (page, data);
                if (callback) callback ();
            });
    }

    getMiddleware (route: string, middleware: Function, callback?: NextFunction) {
        this.app.
            route (route).
            get ((request, response) => {
                response.json ({ data: middleware (request, response) });
                if (callback) callback ();
            });
    }

    private start (config: { port: number }) {
        this.app.listen (config.port, () => console.log (`Server working on http://127.0.0.1:${ config.port }`));
    }

}

export type request = express.Request;