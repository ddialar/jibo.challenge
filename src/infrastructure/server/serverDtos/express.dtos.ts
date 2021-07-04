import { Request } from 'express'
import { NluDto } from '@infrastructure/dtos'

export interface NluRequestDto extends Request {
  nlu: NluDto
}
