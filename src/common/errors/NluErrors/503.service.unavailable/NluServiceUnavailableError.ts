import { ApiError, SERVICE_UNAVAILABLE } from '@errors'

const message = 'NLU third party service unavailable.'

export class NluServiceUnavailableError extends ApiError {
  constructor (description?: string) {
    super(SERVICE_UNAVAILABLE, message, description)
  }
}
