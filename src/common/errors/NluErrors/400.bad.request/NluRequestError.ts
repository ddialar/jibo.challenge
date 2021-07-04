import { ApiError, BAD_REQUEST } from '@errors'

const message = 'Wrong NLU request parameters error.'

export class NluRequestError extends ApiError {
  constructor (description?: string) {
    super(BAD_REQUEST, message, description)
  }
}
