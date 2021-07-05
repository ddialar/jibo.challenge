import { Request } from 'express'
import { ServiceRequest } from '@types'

export interface NluRequest extends Request {
  nlu?: ServiceRequest
}
