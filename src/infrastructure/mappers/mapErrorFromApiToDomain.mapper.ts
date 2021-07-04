import { ApiError } from '@types'

export const mapErrorFromApiToDomain = (data: any): ApiError => ({
  error: true,
  message: data?.message || 'There was an error with your request.'
})
