export interface NluBRequest {
  utterance: string
  model: string
}

export interface NluBResponse {
  intent: string
  entity: string
  confidence: number
}
