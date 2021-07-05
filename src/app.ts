import { appLogger } from '@logger'

import { runServer, stopServer } from '@infrastructure/server'
import { checkStartup } from './preset'

const startApplication = async () => {
  try {
    runServer()
  } catch ({ message }) {
    appLogger('error', 'Application stating error')
  }
}

const closeApplication = async () => {
  stopServer()
  appLogger('info', 'Service successfully closed.')
}

const requiredEnvVariables = [
  'SERVER_PORT',
  'LOGGER_LEVEL',
  'NLU_A_PATH',
  'NLU_B_PATH'
]

checkStartup(requiredEnvVariables)

process.on('SIGINT', async () => closeApplication())
process.on('SIGTERM', async () => closeApplication())

if (process.env.NODE_ENV !== 'test') { startApplication() }
