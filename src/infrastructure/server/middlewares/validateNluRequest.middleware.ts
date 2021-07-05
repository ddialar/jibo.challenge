import { Response, NextFunction } from 'express'
import { NluRequestError } from '@errors'
import { NluRequest } from '../types'

import { validateNluRequestParams } from '@infrastructure/server/validators'

export const validateNluRequest = (req: NluRequest, res: Response, next: NextFunction) => {
  try {
    const { text, utterance, model } = req.body

    const { error, value } = validateNluRequestParams({ text, utterance, model })

    if (error) {
      throw new NluRequestError(error)
    }

    req.nlu = {
      text: value.text,
      utterance: value.utterance,
      model: value.model
    }

    return next()
  } catch (error) {
    return next(error)
  }
}
