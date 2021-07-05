import { NextFunction, Request, Response } from 'express'
import { serverLogger } from '@logger'
import { RouteNotFoundError } from '@errors'

export const handleNotFoundRouteError = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.route) {
    const errorMessage = `Requested route (${req.url}) doesn't exist.`
    serverLogger('error', errorMessage)
    next(new RouteNotFoundError(errorMessage))
  }

  next()
}
