import { NluBRequest } from '@types'

export const mockedNluBRequestData: NluBRequest = {
  utterance: 'one',
  model: 'modelA'
}

export const mockedNluBRawData = [
  {
    intent: 'one',
    entity: 'one',
    confidence: 1
  },
  {
    intent: 'two',
    entity: 'two',
    confidence: 2
  },
  {
    intent: 'ten',
    entity: 'ten',
    confidence: 10
  }
]
