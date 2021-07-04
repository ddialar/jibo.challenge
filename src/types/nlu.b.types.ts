type NluBModels = 'modelA' | 'modelB' | 'modelC'

export interface NluBRequest {
  utterance: string
  model: NluBModels
}

export interface NluBResponse {
  intent: string
  entities: string
  confidence: number
}
