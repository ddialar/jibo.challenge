import { logger } from './config'

type LogTypes = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'mark'

export const appLogger = (logType: LogTypes, message: string) => logger[logType](`[app] - ${message}`)
export const serverLogger = (logType: LogTypes, message: string) => logger[logType](`[server] - ${message}`)
export const nluLogger = (logType: LogTypes, message: string) => logger[logType](`[nlu] - ${message}`)
