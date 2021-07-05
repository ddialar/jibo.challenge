import { ApiError, NOT_FOUND } from '@errors'

const message = 'Route not found.'

export class RouteNotFoundError extends ApiError {
  constructor (description?: string) {
    super(NOT_FOUND, message, description)
  }
}
