import { Router } from 'express'

import { nluGeneralRoutes } from './nlu.general.routes'

const NLU_PATH = ''

const nluRoutes = Router()

nluRoutes.use(NLU_PATH, nluGeneralRoutes)

export { nluRoutes }
