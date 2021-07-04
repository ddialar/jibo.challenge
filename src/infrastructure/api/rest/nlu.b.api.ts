import { runRequest, RequestArgs } from './runRequest'
import { NluBRequest } from '@types'

export const getNluBData = async ({ utterance, model }: NluBRequest) => {
  const requestParams: RequestArgs = {
    method: 'get',
    baseUrl: process.env.NLU_B_PATH!,
    body: { utterance, model }
  }

  return await runRequest(requestParams)
}
