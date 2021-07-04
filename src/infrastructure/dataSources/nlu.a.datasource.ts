import { NluARestApi } from '@infrastructure/api'
import { mapErrorFromApiToDomain, mapNluAFromApiToDomain } from '@infrastructure/mappers'
import { NluARequest, NluAResponse, ApiError } from '@types'

export const getNluAData = async ({ text, model }: NluARequest): Promise<NluAResponse | null | ApiError> => {
  const result = await NluARestApi.getNluAData({ text, model })

  return 'error' in result ? mapErrorFromApiToDomain(result) : mapNluAFromApiToDomain(result)
}