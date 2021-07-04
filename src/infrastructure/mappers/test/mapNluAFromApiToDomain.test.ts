import { mapNluAFromApiToDomain } from '..'
import { NluAResponse } from '@types'

describe('[ MAPPERS ] - mapNluAFromApiToDomain', () => {
  const mockedData: NluAResponse = {
    intents: ['one', 'two'],
    entities: ['one', 'two'],
    confidence: 10
  }

  it('maps the information successfully', () => {
    const nluARawData: NluAResponse = { ...mockedData }
    const expectedResult: NluAResponse = { ...nluARawData }

    expect(mapNluAFromApiToDomain(nluARawData)).toStrictEqual(expectedResult)
  })

  it('returns the default intents value when it is not provided', () => {
    const { entities, confidence } = mockedData
    const nluARawData = { entities, confidence }
    const expectedResult: NluAResponse = { ...nluARawData, intents: [] }

    expect(mapNluAFromApiToDomain(nluARawData)).toStrictEqual(expectedResult)
  })

  it('returns the default entities value when it is not provided', () => {
    const { intents, confidence } = mockedData
    const nluARawData = { intents, confidence }
    const expectedResult: NluAResponse = { ...nluARawData, entities: [] }

    expect(mapNluAFromApiToDomain(nluARawData)).toStrictEqual(expectedResult)
  })

  it('returns the default confidence value when it is not provided', () => {
    const { intents, entities } = mockedData
    const nluARawData = { intents, entities }
    const expectedResult: NluAResponse = { ...nluARawData, confidence: 0 }

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
