import { mapNluBFromApiToDomain } from '..'
import { NluBResponse, ServiceResponse } from '@types'
import {
  mockedNluBRawData
} from '@testingFixtures'

describe('[ MAPPERS ] - mapNluBFromApiToDomain', () => {
  it('maps the information successfully', () => {
    const nluBRawData: NluBResponse[] = [...mockedNluBRawData]
    const expectedResult: ServiceResponse[] = [
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

    expect(mapNluBFromApiToDomain(nluBRawData)).toStrictEqual(expectedResult)
  })

  it('returns the default intent value when it is not provided', () => {
    const [first, ...restOfData] = mockedNluBRawData
    const { entity, confidence } = first
    const nluBRawData: Partial<NluBResponse>[] = [
      {
        entity,
        confidence
      },
      ...restOfData
    ]
    const expectedResult: ServiceResponse[] = [
      {
        intents: [],
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

    expect(mapNluBFromApiToDomain(nluBRawData)).toStrictEqual(expectedResult)
  })

  it('returns the default entity value when it is not provided', () => {
    const [first, ...restOfData] = mockedNluBRawData
    const { intent, confidence } = first
    const nluBRawData: Partial<NluBResponse>[] = [
      {
        intent,
        confidence
      },
      ...restOfData
    ]
    const expectedResult: ServiceResponse[] = [
      {
        intents: ['one'],
        entities: [],
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

    expect(mapNluBFromApiToDomain(nluBRawData)).toStrictEqual(expectedResult)
  })

  it('returns the default confidence value when it is not provided', () => {
    const [first, ...restOfData] = mockedNluBRawData
    const { intent, entity } = first
    const nluBRawData: Partial<NluBResponse>[] = [
      {
        intent,
        entity
      },
      ...restOfData
    ]
    const expectedResult: ServiceResponse[] = [
      {
        intents: ['one'],
        entities: ['one'],
        confidence: 0
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

    expect(mapNluBFromApiToDomain(nluBRawData)).toStrictEqual(expectedResult)
  })

  it('returns null when an empty object is provided', () => {
    const nluBRawData = {}

    expect(mapNluBFromApiToDomain(nluBRawData)).toBeNull()
  })

  it('returns null when no data is provided', () => {
    const nluBRawData = undefined

    expect(mapNluBFromApiToDomain(nluBRawData)).toBeNull()
  })
})
