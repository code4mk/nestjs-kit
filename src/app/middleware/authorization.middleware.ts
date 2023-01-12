import { UnauthorizedException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * Authorization middleware for all route.
 *
 * @see {@link https://docs.nestjs.com/middleware}
 * @returns {never | NextFunction}
 */
@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      throw new UnauthorizedException();
    }
    next();
  }
}
