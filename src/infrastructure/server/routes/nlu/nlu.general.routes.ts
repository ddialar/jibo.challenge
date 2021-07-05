import { Router } from 'express'

import { retrieveTheBestResult } from '@domainServices'

import { validateNluRequest } from '@infrastructure/server/middlewares'
import { NluRequest } from '@infrastructure/server/types'

import { nluLogger } from '@logger'

const nluGeneralRoutes = Router()

nluGeneralRoutes.get('/nlu', validateNluRequest, async (req: NluRequest, res, next) => {
  const { nlu } = req

  nluLogger('debug', 'Retrieving nlu result.')

  try {
    res.json(await retrieveTheBestResult(nlu!))
  } catch (error) {
    next(error)
  }
})

export { nluGeneralRoutes }
