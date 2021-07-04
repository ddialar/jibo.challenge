import { mapErrorFromApiToDomain } from '..'
import { ApiError } from '@types'

describe('[ MAPPERS ] - mapErrorFromApiToDomain', () => {
  const mockedData = { message: 'Testing error message' }
  const defaultErrorMessage = 'There was an error with your request.'

  it('maps the information successfully', () => {
    const data = { ...mockedData }
    const expectedResult: ApiError = {
      error: true,
      message: data.message
    }

    expect(mapErrorFromApiToDomain(data)).toStrictEqual(expectedResult)
  })

  it('returns the default message when it is not provided', () => {
    const data = {}
    const expectedResult: ApiError = {
      error: true,
      message: defaultErrorMessage
    }

    expect(mapErrorFromApiToDomain(data)).toStrictEqual(expectedResult)
  })

  it('returns the default message when no data is not provided', () => {
    const data = undefined
    const expectedResult: ApiError = {
      error: true,
      message: defaultErrorMessage
    }

    expect(mapErrorFromApiToDomain(data)).toStrictEqual(expectedResult)
  })
})
