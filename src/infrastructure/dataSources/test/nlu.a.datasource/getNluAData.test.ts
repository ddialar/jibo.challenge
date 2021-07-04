import { getNluAData } from '../..'
import { NluARestApi } from '@infrastructure/api'
import { NluARequest } from '@types'

const methodToBeMocked = 'getNluAData'
const mockedNluARequestData: NluARequest = {
  text: 'one',
  model: 'testing model'
}
const mockedNluRawData = {
  intents: ['one', 'two'],
  entities: ['one', 'two'],
  confidence: 10
}
const mockedErrorReply = {
  error: true,
  message: 'Testing error message'
}

describe('[ DATASOURCES ] - getNluAData', () => {
  it('returns the requested data successfully', async () => {
    jest.spyOn(NluARestApi, methodToBeMocked).mockResolvedValue(mockedNluRawData)

    const expectedResult = [mockedNluRawData]
    const result = await getNluAData(mockedNluARequestData)

    expect(result).toStrictEqual(expectedResult)

    jest.spyOn(NluARestApi, methodToBeMocked).mockRestore()
  })

  it('returns custom error object when something went wrong with the request', async () => {
    jest.spyOn(NluARestApi, methodToBeMocked).mockResolvedValue(mockedErrorReply)

    const expectedResult = { ...mockedErrorReply }
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

  it('returns well formatted error when it is retrieved from the API', async () => {
    jest.spyOn(NluARestApi, methodToBeMocked).mockResolvedValue({})

    const result = await getNluAData(mockedNluARequestData)

    expect(result).toBeNull()

    jest.spyOn(NluARestApi, methodToBeMocked).mockRestore()
  })
})
