import { ServiceResponse } from '@types'

export const mapNluAFromApiToDomain = (nluARawData?: any): ServiceResponse[] | null =>
  nluARawData && Object.keys(nluARawData).length
    ? [{
      intents: nluARawData.intents || [],
      entities: nluARawData.entities || [],
      confidence: nluARawData.confidence || 0
    }]
    : null
