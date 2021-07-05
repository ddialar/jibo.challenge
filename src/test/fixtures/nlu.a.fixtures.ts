import { NluARequest } from '@types'

export const mockedNluARequestData: NluARequest = {
  text: 'one',
  model: 'testing model'
}

export const mockedNluARawData = {
  intents: ['one', 'two'],
  entities: ['one', 'two'],
  confidence: 10
}
