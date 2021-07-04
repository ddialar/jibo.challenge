import { Request } from 'express'
import { ApiRequest } from '@types'

export interface NluRequest extends Request {
  nlu: ApiRequest
}
