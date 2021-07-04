import { NluBResponse } from '@types'

export const mapNluBFromApiToDomain = (nluBRawData?: any): NluBResponse[] | null =>
  nluBRawData && nluBRawData.length
    ? nluBRawData.map((nluB: NluBResponse) => ({
      intent: nluB.intent || '',
      entity: nluB.entity || '',
      confidence: nluB.confidence || 0
    }))
    : null
