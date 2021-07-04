import axios from 'axios'

export interface RequestArgs {
  method: 'get' | 'post' | 'put' | 'delete'
  baseUrl: string
  url?: string
  body: Record<string, string>
  timeout?: number
}

export const runRequest = async ({ method, baseUrl, url, body, timeout = 5000 }: RequestArgs) => {
  const requestConfig = {
    method,
    baseUrl,
    url,
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    },
    data: body && JSON.stringify(body),
    timeout
  }

  try {
    // NOTE: 'response' is AxiosResponse type.
    return (await axios(requestConfig)).data
  } catch (error) {
    // NOTE: 'error' is AxiosError type.
    return axios.isAxiosError(error) ? error?.response?.data : { message: error.message }
  }
}
