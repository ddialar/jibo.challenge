import { paths } from './paths'
import { components } from './components'

export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Jibo code challenge',
    description: 'Jibo code challenge.',
    termOfService: '',
    contact: {
      name: 'Dailos Rafael Díaz Lara',
      url: 'https://github.com/ddialar'
    }
  },
  paths,
  components: {
    schemas: { ...components }
  }
}

export const swaggerOptions = {}
