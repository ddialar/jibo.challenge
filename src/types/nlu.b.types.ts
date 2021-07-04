type NluBModels = 'modelA' | 'modelB' | 'modelC'

export interface NluBRequest {
  utterance: string
  model: NluBModels
}

export interface NluBResponse {
  intent: string
  entity: string
  confidence: number
}
