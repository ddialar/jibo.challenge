import { NluDto } from '@infrastructure/dtos'
import Joi from 'joi'

import { nluText, nluUtterance, nluModel } from '../validation.rules'

const schema = Joi.object({ text: nluText, utterance: nluUtterance, model: nluModel })

interface ValidationResult {
  error?: string
  value: NluDto
}

export const validateNluRequestParams = ({ text, utterance, model }: NluDto): ValidationResult => {
  const { error, value } = schema.validate({ text, utterance, model })

  return {
    error: error && error.details[0].message,
    value
  }
}
