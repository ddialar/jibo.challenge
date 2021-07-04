import { mapNluBFromApiToDomain } from '..'
import { NluBResponse } from '@types'

describe('[ MAPPERS ] - mapNluBFromApiToDomain', () => {
  const mockedData: NluBResponse[] = [
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

  it('maps the information successfully', () => {
    const nluBRawData: NluBResponse[] = [...mockedData]
    const expectedResult: NluBResponse[] = [...nluBRawData]

    expect(mapNluBFromApiToDomain(nluBRawData)).toStrictEqual(expectedResult)
  })

  it('returns the default intent value when it is not provided', () => {
    const [first, ...restOfData] = mockedData
    const { entity, confidence } = first
    const nluBRawData: Partial<NluBResponse>[] = [
      {
        entity,
        confidence
      },
      ...restOfData
    ]
    const expectedResult = [...nluBRawData]
    expectedResult[0].intent = ''

    expect(mapNluBFromApiToDomain(nluBRawData)).toStrictEqual(expectedResult)
  })

  it('returns the default entity value when it is not provided', () => {
    const [first, ...restOfData] = mockedData
    const { intent, confidence } = first
    const nluBRawData: Partial<NluBResponse>[] = [
      {
        intent,
        confidence
      },
      ...restOfData
    ]
    const expectedResult = [...nluBRawData]
    expectedResult[0].entity = ''

    expect(mapNluBFromApiToDomain(nluBRawData)).toStrictEqual(expectedResult)
  })

  it('returns the default confidence value when it is not provided', () => {
    const [first, ...restOfData] = mockedData
    const { intent, entity } = first
    const nluBRawData: Partial<NluBResponse>[] = [
      {
        intent,
        entity
      },
      ...restOfData
    ]
    const expectedResult = [...nluBRawData]
    expectedResult[0].confidence = 0

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
