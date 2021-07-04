import { retrieveTheBestResult } from '../..'
import { NluARestApi, NluBRestApi } from '@infrastructure/api'
// import { ServiceRequest, ServiceResponse } from '@types'
import { ServiceRequest } from '@types'

const mockedServiceRequest: ServiceRequest = {
  text: 'testing text',
  utterance: 'testing utterance',
  model: 'modelA'
}
const mockedNluARawData = {
  intents: ['one', 'two'],
  entities: ['one', 'two'],
  confidence: 10
}
const mockedNluBRawData = [
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
const mockedErrorReply = {
  error: true,
  message: 'Testing error message'
}

describe('[ SERVICES ] - retrieveTheBestResult', () => {
  afterEach(() => {
    jest.spyOn(NluARestApi, 'getNluAData').mockRestore()
    jest.spyOn(NluBRestApi, 'getNluBData').mockRestore()
  })

  describe('returns a valid response', () => {
    it('when service NLU_A result has a higher condidence', async () => {
      jest.spyOn(NluARestApi, 'getNluAData').mockResolvedValue({ ...mockedNluARawData, confidence: 1000 })
      jest.spyOn(NluBRestApi, 'getNluBData').mockResolvedValue(mockedNluBRawData)

      const serviceRequest = { ...mockedServiceRequest }
      const expectedResult = {
        intents: [
          'one',
          'two'
        ],
        entities: [
          'one',
          'two'
        ],
        confidence: 1000
      }
      const result = await retrieveTheBestResult(serviceRequest)

      expect(result).toStrictEqual(expectedResult)
    })

    it('when service NLU_B result has a higher condidence', async () => {
      jest.spyOn(NluARestApi, 'getNluAData').mockResolvedValue({ ...mockedNluARawData, confidence: 9 })
      jest.spyOn(NluBRestApi, 'getNluBData').mockResolvedValue(mockedNluBRawData)

      const serviceRequest = { ...mockedServiceRequest }
      const expectedResult = {
        intents: [
          'ten'
        ],
        entities: [
          'ten'
        ],
        confidence: 10
      }
      const result = await retrieveTheBestResult(serviceRequest)

      expect(result).toStrictEqual(expectedResult)
    })

    it('based on the merging results of external services with the same confidence', async () => {
      jest.spyOn(NluARestApi, 'getNluAData').mockResolvedValue(mockedNluARawData)
      jest.spyOn(NluBRestApi, 'getNluBData').mockResolvedValue(mockedNluBRawData)

      const serviceRequest = { ...mockedServiceRequest }
      const expectedResult = {
        intents: [
          'one',
          'two',
          'ten'
        ],
        entities: [
          'one',
          'two',
          'ten'
        ],
        confidence: 10
      }
      const result = await retrieveTheBestResult(serviceRequest)

      expect(result).toStrictEqual(expectedResult)
    })

    it('even when service NLU_A fails', async () => {
      jest.spyOn(NluARestApi, 'getNluAData').mockResolvedValue(mockedErrorReply)
      jest.spyOn(NluBRestApi, 'getNluBData').mockResolvedValue(mockedNluBRawData)

      const serviceRequest = { ...mockedServiceRequest }
      const expectedResult = {
        intents: [
          'ten'
        ],
        entities: [
          'ten'
        ],
        confidence: 10
      }
      const result = await retrieveTheBestResult(serviceRequest)

      expect(result).toStrictEqual(expectedResult)
    })

    it('even when service NLU_B fails', async () => {
      jest.spyOn(NluARestApi, 'getNluAData').mockResolvedValue(mockedNluARawData)
      jest.spyOn(NluBRestApi, 'getNluBData').mockResolvedValue(mockedErrorReply)

      const serviceRequest = { ...mockedServiceRequest }
      const expectedResult = {
        intents: [
          'one',
          'two'
        ],
        entities: [
          'one',
          'two'
        ],
        confidence: 10
      }
      const result = await retrieveTheBestResult(serviceRequest)

      expect(result).toStrictEqual(expectedResult)
    })
  })

  describe('returns the default value when third party services', () => {
    it('return non valida data', async () => {
      jest.spyOn(NluARestApi, 'getNluAData').mockResolvedValue({})
      jest.spyOn(NluBRestApi, 'getNluBData').mockResolvedValue({})

      const serviceRequest = { ...mockedServiceRequest }
      const expectedResult = {
        intents: [],
        entities: [],
        confidence: 0
      }
      const result = await retrieveTheBestResult(serviceRequest)

      expect(result).toStrictEqual(expectedResult)
    })

    it('fail', async () => {
      jest.spyOn(NluARestApi, 'getNluAData').mockResolvedValue(mockedErrorReply)
      jest.spyOn(NluBRestApi, 'getNluBData').mockResolvedValue(mockedErrorReply)

      const serviceRequest = { ...mockedServiceRequest }
      const expectedResult = {
        intents: [],
        entities: [],
        confidence: 0
      }
      const result = await retrieveTheBestResult(serviceRequest)

      expect(result).toStrictEqual(expectedResult)
    })
  })
})
