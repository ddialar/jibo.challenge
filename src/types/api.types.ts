export interface ApiError {
  error: true
  message: string
}

export interface ApiRequest {
  text: string
  utterance: string
  model: string
}
