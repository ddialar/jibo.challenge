export interface ServiceRequest {
  text: string
  utterance: string
  model: string
}

export interface ServiceResponse {
  intents: string[]
  entities: string[]
  confidence: number
}
