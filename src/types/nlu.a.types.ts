export interface NluARequest {
  text: string
  model: string
}

export interface NluAResponse {
  intents: string[]
  entities: string[]
  confidence: number
}
