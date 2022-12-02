import { Request, Response } from 'express';

import Logger from '../core/logger/loger.service';

export function loggingAfter(request: Request, response: Response, next?: (err?: any) => any): any {
  Logger.info(`[${request.url}, ${request.method}]`);
  next();
}
