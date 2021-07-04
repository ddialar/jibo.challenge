import { ServiceResponse, NluBResponse } from '@types'

export const mapNluBFromApiToDomain = (nluBRawData?: any): ServiceResponse[] | null =>
  nluBRawData && nluBRawData.length
    ? nluBRawData.map((nluB: NluBResponse): ServiceResponse => ({
      intents: nluB.intent ? [nluB.intent] : [],
      entities: nluB.entity ? [nluB.entity] : [],
      confidence: nluB.confidence || 0
    }))
    : null
