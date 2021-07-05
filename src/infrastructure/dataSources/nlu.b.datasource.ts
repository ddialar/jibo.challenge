import { NluBRestApi } from '@infrastructure/repositories'
import { mapNluBFromApiToDomain } from '@infrastructure/mappers'
import { NluBRequest, ServiceResponse } from '@types'
import { NluModelNotValidError, NluServiceUnavailableError } from '@errors'
import { dataSourceLogger } from '@logger'

const allowedNluBModels = ['modelA', 'modelB', 'modelC']

export const getNluBData = async ({ utterance, model }: NluBRequest): Promise<ServiceResponse[] | null> => {
  if (!allowedNluBModels.includes(model)) {
    const errorMessage = `The provided model (${model}) is not allowed for NLU_B service'.`
    dataSourceLogger('error', errorMessage)
    throw new NluModelNotValidError(errorMessage)
  }

  const result = await NluBRestApi.getNluBData({ utterance, model })

  if ('error' in result) {
    const errorMessage = `Retrieving NLU_B data with params utterance '${utterance}' and model '${model}'. ${result.message}`
    dataSourceLogger('error', errorMessage)
    throw new NluServiceUnavailableError(errorMessage)
  }

  return mapNluBFromApiToDomain(result)
}
