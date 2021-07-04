import { runRequest, RequestArgs } from './runRequest'
import { NluARequest } from '@types'

export const getNluAData = async ({ text, model }: NluARequest) => {
  const requestParams: RequestArgs = {
    method: 'get',
    baseUrl: process.env.NLU_A_PATH!,
    body: { text, model }
  }

  return await runRequest(requestParams)
}
