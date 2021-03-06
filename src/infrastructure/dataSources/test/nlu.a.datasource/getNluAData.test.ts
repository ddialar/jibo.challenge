import { getNluAData } from '../..'
import { NluARestApi } from '@infrastructure/repositories'
import { NluServiceUnavailableError } from '@errors'
import {
  mockedNluARawData,
  mockedNluARequestData,
  mockedErrorReply
} from '@testingFixtures'

const methodToBeMocked = 'getNluAData'

describe('[ DATASOURCES ] - getNluAData', () => {
  it('returns the requested data successfully', async () => {
    jest.spyOn(NluARestApi, methodToBeMocked).mockResolvedValue(mockedNluARawData)

    const expectedResult = [mockedNluARawData]
    const result = await getNluAData(mockedNluARequestData)

    expect(result).toStrictEqual(expectedResult)

    jest.spyOn(NluARestApi, methodToBeMocked).mockRestore()
  })

  it('returns null when an empty object is retrieved from the API', async () => {
    jest.spyOn(NluARestApi, methodToBeMocked).mockResolvedValue({})

    const result = await getNluAData(mockedNluARequestData)

    expect(result).toBeNull()

    jest.spyOn(NluARestApi, methodToBeMocked).mockRestore()
  })

  it('throws a custom error when there are troubbles in the remote resource', async () => {
    jest.spyOn(NluARestApi, methodToBeMocked).mockResolvedValue(mockedErrorReply)

    const errorMessage = `Retrieving NLU_A data with params text '${mockedNluARequestData.text}' and model '${mockedNluARequestData.model}'. ${mockedErrorReply.message}`
    const expectedError = new NluServiceUnavailableError(errorMessage)

    try {
      await getNluAData(mockedNluARequestData)
    } catch (error) {
      expect(error.status).toBe(expectedError.status)
      expect(error.message).toBe(expectedError.message)
      expect(error.description).toBe(expectedError.description)
    }

    jest.spyOn(NluARestApi, methodToBeMocked).mockRestore()
  })
})
