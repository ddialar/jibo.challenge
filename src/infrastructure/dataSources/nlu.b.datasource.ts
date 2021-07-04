import { NluBRestApi } from '@infrastructure/api'
import { mapErrorFromApiToDomain, mapNluBFromApiToDomain } from '@infrastructure/mappers'
import { NluBRequest, NluBResponse, ApiError } from '@types'

export const getNluBData = async ({ utterance, model }: NluBRequest): Promise<NluBResponse[] | null | ApiError> => {
  const result = await NluBRestApi.getNluBData({ utterance, model })

  return 'error' in result ? mapErrorFromApiToDomain(result) : mapNluBFromApiToDomain(result)
}
