import express, { json, Router } from 'express';
import cors from 'cors';
import { validation } from './validators.js';
import { config } from 'dotenv';
const router = Router();
config();

express()
    .use(cors({
        origin: process.env.CORS_ORIGIN,
        methods: process.env.CORS_METHODS.split(','),
        allowedHeaders: process.env.CORS_ALLOWED_HEADERS.split(','),
        exposedHeaders: process.env.CORS_EXPOSED_HEADERS.split(','),
        credentials: process.env.CORS_CREDENTIALS === 'true',
        maxAge: parseInt(process.env.CORS_MAX_AGE, 10),
        preflightContinue: process.env.CORS_PREFLIGHT_CONTINUE === 'true',
        optionsSuccessStatus: parseInt(process.env.CORS_OPTIONS_SUCCESS_STATUS, 10)
    }))
    .use(json())
    .use(process.env.ENDPOINT, router)
    .get(process.env.ENDPOINT, (_, res) => res.send("listening"))
    .use((err, _, res, next) => (console.error(err.stack), res.status(500).send('Internal Server Error')))
    .listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT + process.env.ENDPOINT}`));

export const handleBackendPost = ({ route, auth_fns, dbQuery }) => {
    router.post(
        `/${route}`,
        validation[route] || [],
        validation["*"],
        async (req, res) => {
            try {
                for (const fn of auth_fns) await fn(req, res);

                const results = await Promise.all(
                    dbQuery.map(({ db, query, param, calc_fns, show }) =>
                        new Promise((resolve, reject) => {
                            db.getConnection((connErr, connection) => {
                                connErr 
                                    ? reject(connErr)
                                    : connection.query(
                                        query,
                                        param.map((key) => req.body[key]),
                                        (queryErr, rows) => {
                                            connection.release();
                                            queryErr
                                                ? reject(queryErr)
                                                : (calc_fns.forEach((fn) => fn(rows, req, res)), resolve(show ? rows : null));
                                        }
                                    );
                            });
                        })
                    )
                );
                res.status(200).send({ status: 200, info: results.filter(Boolean)[0] });
            } catch (error) {
                console.error(`Error in backend handling: ${error}`);
                res.status(500).send({ status: 500, error: 'Internal Server Error' });
            }
        }
    );
};
