import { NluARestApi } from '@infrastructure/repositories'
import { mapNluAFromApiToDomain } from '@infrastructure/mappers'
import { NluARequest, ServiceResponse } from '@types'
import { NluServiceUnavailableError } from '@errors'
import { dataSourceLogger } from '@logger'

export const getNluAData = async ({ text, model }: NluARequest): Promise<ServiceResponse[] | null> => {
  const result = await NluARestApi.getNluAData({ text, model })

  if ('error' in result) {
    const errorMessage = `Retrieving NLU_A data with params text '${text}' and model '${model}'. ${result.message}`
    dataSourceLogger('error', errorMessage)
    throw new NluServiceUnavailableError(errorMessage)
  }

  return mapNluAFromApiToDomain(result)
}
