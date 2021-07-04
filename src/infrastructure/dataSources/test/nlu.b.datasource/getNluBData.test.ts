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
  }
]
const mockedErrorReply = {
  error: true,
  message: 'Testing error message'
}

describe('[ DATASOURCES ] - getNluBData', () => {
  it('returns the requested data successfully', async () => {
    jest.spyOn(NluBRestApi, methodToBeMocked).mockResolvedValue(mockedNluRawData)

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
      }
    ]
    const result = await getNluBData(nluBRequestData)

    expect(result).toStrictEqual(expectedResult)

    jest.spyOn(NluBRestApi, methodToBeMocked).mockRestore()
  })

  it('returns custom error object when something went wrong with the request', async () => {
    jest.spyOn(NluBRestApi, methodToBeMocked).mockResolvedValue(mockedErrorReply)

    const nluBRequestData = { ...mockedNluBRequestData }
    const expectedResult = { ...mockedErrorReply }
    const result = await getNluBData(nluBRequestData)

    expect(result).toStrictEqual(expectedResult)

    jest.spyOn(NluBRestApi, methodToBeMocked).mockRestore()
  })

  it('returns null when we request using a non valid model', async () => {
    jest.spyOn(NluBRestApi, methodToBeMocked).mockResolvedValue({})

    const nluBRequestData = { ...mockedNluBRequestData }
    nluBRequestData.model = 'Testing Non Valid Model'
    const result = await getNluBData(nluBRequestData)

    expect(result).toBeNull()

    jest.spyOn(NluBRestApi, methodToBeMocked).mockRestore()
  })

  it('returns null when an empty object is retrieved from the API', async () => {
    jest.spyOn(NluBRestApi, methodToBeMocked).mockResolvedValue({})

    const nluBRequestData = { ...mockedNluBRequestData }
    const result = await getNluBData(nluBRequestData)

    expect(result).toBeNull()

    jest.spyOn(NluBRestApi, methodToBeMocked).mockRestore()
  })

  it('returns well formatted error when it is retrieved from the API', async () => {
    jest.spyOn(NluBRestApi, methodToBeMocked).mockResolvedValue({})

    const nluBRequestData = { ...mockedNluBRequestData }
    const result = await getNluBData(nluBRequestData)

    expect(result).toBeNull()

    jest.spyOn(NluBRestApi, methodToBeMocked).mockRestore()
  })
})
