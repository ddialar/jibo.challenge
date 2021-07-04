import { mapNluAFromApiToDomain } from '..'
import { NluAResponse, ServiceResponse } from '@types'

const mockedRequestData: NluAResponse = {
  intents: ['one', 'two'],
  entities: ['one', 'two'],
  confidence: 10
}

describe('[ MAPPERS ] - mapNluAFromApiToDomain', () => {
  it('maps the information successfully', () => {
    const nluARawData: NluAResponse = { ...mockedRequestData }
    const expectedResult: ServiceResponse[] = [nluARawData]

    expect(mapNluAFromApiToDomain(nluARawData)).toStrictEqual(expectedResult)
  })

  it('returns the default intents value when it is not provided', () => {
    const { entities, confidence } = mockedRequestData
    const nluARawData = { entities, confidence }
    const expectedResult: ServiceResponse[] = [{ ...nluARawData, intents: [] }]

    expect(mapNluAFromApiToDomain(nluARawData)).toStrictEqual(expectedResult)
  })

  it('returns the default entities value when it is not provided', () => {
    const { intents, confidence } = mockedRequestData
    const nluARawData = { intents, confidence }
    const expectedResult: ServiceResponse[] = [{ ...nluARawData, entities: [] }]

    expect(mapNluAFromApiToDomain(nluARawData)).toStrictEqual(expectedResult)
  })

  it('returns the default confidence value when it is not provided', () => {
    const { intents, entities } = mockedRequestData
    const nluARawData = { intents, entities }
    const expectedResult: ServiceResponse[] = [{ ...nluARawData, confidence: 0 }]

    expect(mapNluAFromApiToDomain(nluARawData)).toStrictEqual(expectedResult)
  })

  it('returns null when an empty object is provided', () => {
    const nluARawData = {}

    expect(mapNluAFromApiToDomain(nluARawData)).toBeNull()
  })

  it('returns null when no data is provided', () => {
    const nluARawData = undefined

    expect(mapNluAFromApiToDomain(nluARawData)).toBeNull()
  })
})
