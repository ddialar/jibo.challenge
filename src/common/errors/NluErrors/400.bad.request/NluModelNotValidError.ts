import { ApiError, BAD_REQUEST } from '@errors'

const message = 'NLU model not valid.'

export class NluModelNotValidError extends ApiError {
  constructor (description?: string) {
    super(BAD_REQUEST, message, description)
  }
}
