import Joi from 'joi'
import { ServiceRequest } from '@types'

import { nluText, nluUtterance, nluModel } from '../validation.rules'

const schema = Joi.object({ text: nluText, utterance: nluUtterance, model: nluModel })

interface ValidationResult {
  error?: string
  value: ServiceRequest
}

export const validateNluRequestParams = ({ text, utterance, model }: Partial<ServiceRequest>): ValidationResult => {
  const { error, value } = schema.validate({ text, utterance, model })

  return {
    error: error && error.details[0].message,
    value
  }
}
