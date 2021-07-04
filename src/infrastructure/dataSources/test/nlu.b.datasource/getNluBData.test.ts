import { getNluBData } from '../..'
import { NluBRestApi } from '@infrastructure/api'
import { NluBRequest } from '@types'

const methodToBeMocked = 'getNluBData'
const mockedNluBRequestData: NluBRequest = {
  utterance: 'one',
  model: 'modelA'
}
const mockedNluRawData = [
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
    intent: 'three',
    entity: 'three',
    confidence: 3
  }
]
const mockedErrorReply = {
  error: true,
  message: 'Testing error message'
}

describe('[ DATASOURCES ] - getNluBData', () => {
  it('returns the requested data successfully', async () => {
    jest.spyOn(NluBRestApi, methodToBeMocked).mockResolvedValue(mockedNluRawData)

    const expectedResult = [...mockedNluRawData]
    const result = await getNluBData(mockedNluBRequestData)

    expect(result).toStrictEqual(expectedResult)

    jest.spyOn(NluBRestApi, methodToBeMocked).mockRestore()
  })

  it('returns custom error object when something went wrong with the request', async () => {
    jest.spyOn(NluBRestApi, methodToBeMocked).mockResolvedValue(mockedErrorReply)

    const expectedResult = { ...mockedErrorReply }
    const result = await getNluBData(mockedNluBRequestData)

    expect(result).toStrictEqual(expectedResult)

    jest.spyOn(NluBRestApi, methodToBeMocked).mockRestore()
  })

  it('returns null when an empty object is retrieved from the API', async () => {
    jest.spyOn(NluBRestApi, methodToBeMocked).mockResolvedValue({})

    const result = await getNluBData(mockedNluBRequestData)

    expect(result).toBeNull()

    jest.spyOn(NluBRestApi, methodToBeMocked).mockRestore()
  })

  it('returns well formatted error when it is retrieved from the API', async () => {
    jest.spyOn(NluBRestApi, methodToBeMocked).mockResolvedValue({})

    const result = await getNluBData(mockedNluBRequestData)

    expect(result).toBeNull()

    jest.spyOn(NluBRestApi, methodToBeMocked).mockRestore()
  })
})
