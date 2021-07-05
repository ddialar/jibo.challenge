import { getNluBData } from '../..'
import { NluBRestApi } from '@infrastructure/repositories'
import { NluModelNotValidError, NluServiceUnavailableError } from '@errors'
import {
  mockedNluBRawData,
  mockedNluBRequestData,
  mockedErrorReply
} from '@testingFixtures'

const methodToBeMocked = 'getNluBData'

describe('[ DATASOURCES ] - getNluBData', () => {
  it('returns the requested data successfully', async () => {
    jest.spyOn(NluBRestApi, methodToBeMocked).mockResolvedValue(mockedNluBRawData)

    const nluBRequestData = { ...mockedNluBRequestData }
    const expectedResult = [
      {
        intents: ['one'],
        entities: ['one'],
        confidence: 1
      },
      {
        intents: ['two'],
        entities: ['two'],
        confidence: 2
      },
      {
        intents: ['ten'],
        entities: ['ten'],
        confidence: 10
      }
    ]
    const result = await getNluBData(nluBRequestData)

    expect(result).toStrictEqual(expectedResult)

    jest.spyOn(NluBRestApi, methodToBeMocked).mockRestore()
  })

  it('returns null when an empty object is retrieved from the API', async () => {
    jest.spyOn(NluBRestApi, methodToBeMocked).mockResolvedValue({})

    const nluBRequestData = { ...mockedNluBRequestData }
    const result = await getNluBData(nluBRequestData)

    expect(result).toBeNull()

    jest.spyOn(NluBRestApi, methodToBeMocked).mockRestore()
  })

  it('throws an error when a non allowed model is provided', async () => {
    const nluBRequestData = { ...mockedNluBRequestData }
    nluBRequestData.model = 'Test Non Valid Model'

    const errorMessage = `The provided model (${nluBRequestData.model}) is not allowed for NLU_B service'.`
    const expectedError = new NluModelNotValidError(errorMessage)

    try {
      await getNluBData(nluBRequestData)
    } catch (error) {
      expect(error.status).toBe(expectedError.status)
      expect(error.message).toBe(expectedError.message)
      expect(error.description).toBe(expectedError.description)
    }
  })

  it('throws a custom error when there are troubbles in the remote resource', async () => {
    jest.spyOn(NluBRestApi, methodToBeMocked).mockResolvedValue(mockedErrorReply)

    const errorMessage = `Retrieving NLU_B data with params utterance '${mockedNluBRequestData.utterance}' and model '${mockedNluBRequestData.model}'. ${mockedErrorReply.message}`
    const expectedError = new NluServiceUnavailableError(errorMessage)

    try {
      await getNluBData(mockedNluBRequestData)
    } catch (error) {
      expect(error.status).toBe(expectedError.status)
      expect(error.message).toBe(expectedError.message)
      expect(error.description).toBe(expectedError.description)
    }

    jest.spyOn(NluBRestApi, methodToBeMocked).mockRestore()
  })
})
