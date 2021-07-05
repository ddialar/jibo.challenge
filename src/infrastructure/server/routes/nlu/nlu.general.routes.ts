import { Router } from 'express'

import { retrieveTheBestResult } from '@domainServices'

import { nluLogger } from '@logger'

const nluGeneralRoutes = Router()

nluGeneralRoutes.get('/nlu/:text/:utterance/:model', async (req, res, next) => {
  const { text, utterance, model } = req.params

  nluLogger('debug', 'Retrieving nlu result.')

  try {
    res.json(await retrieveTheBestResult({ text, utterance, model }))
  } catch (error) {
    next(error)
  }
})

export { nluGeneralRoutes }
