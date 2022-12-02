import express, { Express, RequestHandler } from 'express';

import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { useExpressServer } from 'routing-controllers';
import swaggerUi from 'swagger-ui-express';
import 'reflect-metadata';
import cors from 'cors';

import { ToDoListController } from './controller/toDoList.controller';
import { GlobalErrorHandler } from './middleware/globalErrorHandler';
import Logger from './core/logger/loger.service';
import * as swaggerDocument from '../src/swagger/openapi.json';

dotenv.config();

import { myDataSource } from './db/appDataSource';

// establish database connection
myDataSource
  .initialize()
  .then(() => {
    Logger.info('Data Source has been initialized!');
  })
  .catch((err) => {
    Logger.error(`Error during Data Source initialization: ${err}`);
  });

const app: Express = express();
const port = process.env.PORT || 5002;

app.use(cors() as RequestHandler);
app.use(bodyParser.json());

useExpressServer(app, {
  routePrefix: '/api/v1',
  controllers: [ToDoListController],
  middlewares: [GlobalErrorHandler],
  defaultErrorHandler: false,
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  Logger.info(`⚡️[server]: Server is running at https://localhost:${port}`);
});
