import { NluBRestApi } from '@infrastructure/api'
import { mapErrorFromApiToDomain, mapNluBFromApiToDomain } from '@infrastructure/mappers'
import { NluBRequest, ServiceResponse, ApiError } from '@types'

const allowedNluBModels = ['modelA', 'modelB', 'modelC']

export const getNluBData = async ({ utterance, model }: NluBRequest): Promise<ServiceResponse[] | null | ApiError> => {
  const result = allowedNluBModels.includes(model)
    ? await NluBRestApi.getNluBData({ utterance, model })
    : null

  return result && 'error' in result ? mapErrorFromApiToDomain(result) : mapNluBFromApiToDomain(result)
}
