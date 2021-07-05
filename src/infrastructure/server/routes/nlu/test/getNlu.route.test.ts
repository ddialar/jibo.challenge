import supertest, { SuperTest, Test } from 'supertest'

import { NluARestApi, NluBRestApi } from '@infrastructure/api'
import { OK, BAD_REQUEST } from '@errors'
import { server } from '@infrastructure/server'
import {
  mockedServiceRequest,
  mockedNluARawData,
  mockedNluBRawData,
  mockedErrorReply
} from '@testingFixtures'

const NLU_PATH = '/nlu'

describe('[ SERVER ] - NLU endpoints', () => {
  describe(`[ GET ] ${NLU_PATH}`, () => {
    const request: SuperTest<Test> = supertest(server)

    describe('returns OK (200) and a valid response', () => {
      afterEach(() => {
        jest.spyOn(NluARestApi, 'getNluAData').mockRestore()
        jest.spyOn(NluBRestApi, 'getNluBData').mockRestore()
      })

      it('when service NLU_A result has a higher condidence', async () => {
        jest.spyOn(NluARestApi, 'getNluAData').mockResolvedValue({ ...mockedNluARawData, confidence: 1000 })
        jest.spyOn(NluBRestApi, 'getNluBData').mockResolvedValue(mockedNluBRawData)

        const serviceRequest = { ...mockedServiceRequest }
        const expectedResult = {
          intents: [
            'one',
            'two'
          ],
          entities: [
            'one',
            'two'
          ],
          confidence: 1000
        }

        await request
          .get(NLU_PATH)
          .send(serviceRequest)
          .expect(OK)
          .then(({ body }) => {
            expect(body).toStrictEqual(expectedResult)
          })
      })

      it('when service NLU_B result has a higher condidence', async () => {
        jest.spyOn(NluARestApi, 'getNluAData').mockResolvedValue({ ...mockedNluARawData, confidence: 9 })
        jest.spyOn(NluBRestApi, 'getNluBData').mockResolvedValue(mockedNluBRawData)

        const serviceRequest = { ...mockedServiceRequest }
        const expectedResult = {
          intents: [
            'ten'
          ],
          entities: [
            'ten'
          ],
          confidence: 10
        }

        await request
          .get(NLU_PATH)
          .send(serviceRequest)
          .expect(OK)
          .then(({ body }) => {
            expect(body).toStrictEqual(expectedResult)
          })
      })

      it('based on the merging results of external services with the same confidence', async () => {
        jest.spyOn(NluARestApi, 'getNluAData').mockResolvedValue(mockedNluARawData)
        jest.spyOn(NluBRestApi, 'getNluBData').mockResolvedValue(mockedNluBRawData)

        const serviceRequest = { ...mockedServiceRequest }
        const expectedResult = {
          intents: [
            'one',
            'two',
            'ten'
          ],
          entities: [
            'one',
            'two',
            'ten'
          ],
          confidence: 10
        }

        await request
          .get(NLU_PATH)
          .send(serviceRequest)
          .expect(OK)
          .then(({ body }) => {
            expect(body).toStrictEqual(expectedResult)
          })
      })

      it('even when service NLU_A fails', async () => {
        jest.spyOn(NluARestApi, 'getNluAData').mockResolvedValue(mockedErrorReply)
        jest.spyOn(NluBRestApi, 'getNluBData').mockResolvedValue(mockedNluBRawData)

        const serviceRequest = { ...mockedServiceRequest }
        const expectedResult = {
          intents: [
            'ten'
          ],
          entities: [
            'ten'
          ],
          confidence: 10
        }

        await request
          .get(NLU_PATH)
          .send(serviceRequest)
          .expect(OK)
          .then(({ body }) => {
            expect(body).toStrictEqual(expectedResult)
          })
      })

      it('even when service NLU_B fails', async () => {
        jest.spyOn(NluARestApi, 'getNluAData').mockResolvedValue(mockedNluARawData)
        jest.spyOn(NluBRestApi, 'getNluBData').mockResolvedValue(mockedErrorReply)

        const serviceRequest = { ...mockedServiceRequest }
        const expectedResult = {
          intents: [
            'one',
            'two'
          ],
          entities: [
            'one',
            'two'
          ],
          confidence: 10
        }

        await request
          .get(NLU_PATH)
          .send(serviceRequest)
          .expect(OK)
          .then(({ body }) => {
            expect(body).toStrictEqual(expectedResult)
          })
      })

      it('even when third party services return non valida data', async () => {
        jest.spyOn(NluARestApi, 'getNluAData').mockResolvedValue({})
        jest.spyOn(NluBRestApi, 'getNluBData').mockResolvedValue({})

        const serviceRequest = { ...mockedServiceRequest }
        const expectedResult = {
          intents: [],
          entities: [],
          confidence: 0
        }

        await request
          .get(NLU_PATH)
          .send(serviceRequest)
          .expect(OK)
          .then(({ body }) => {
            expect(body).toStrictEqual(expectedResult)
          })
      })

      it('even when third party services fail', async () => {
        jest.spyOn(NluARestApi, 'getNluAData').mockResolvedValue(mockedErrorReply)
        jest.spyOn(NluBRestApi, 'getNluBData').mockResolvedValue(mockedErrorReply)

        const serviceRequest = { ...mockedServiceRequest }
        const expectedResult = {
          intents: [],
          entities: [],
          confidence: 0
        }

        await request
          .get(NLU_PATH)
          .send(serviceRequest)
          .expect(OK)
          .then(({ body }) => {
            expect(body).toStrictEqual(expectedResult)
          })
      })
    })

    describe('returns BAD_REQUEST (400) and a valid response', () => {
      it('when request payload is not provided', async () => {
        await request
          .get(NLU_PATH)
          .expect(BAD_REQUEST)
          .then(({ text }) => {
            expect(JSON.parse(text)).toEqual({ error: true, message: 'Wrong NLU request parameters error.' })
          })
      })

      it('when text field is not provided in the request payload', async () => {
        const { text, ...malformedRequestParams } = mockedServiceRequest
        const serviceRequest = { ...malformedRequestParams }

        await request
          .get(NLU_PATH)
          .send(serviceRequest)
          .expect(BAD_REQUEST)
          .then(({ text }) => {
            expect(JSON.parse(text)).toEqual({ error: true, message: 'Wrong NLU request parameters error.' })
          })
      })

      it('when utterance field is not provided in the request payload', async () => {
        const { utterance, ...malformedRequestParams } = mockedServiceRequest
        const serviceRequest = { ...malformedRequestParams }

        await request
          .get(NLU_PATH)
          .send(serviceRequest)
          .expect(BAD_REQUEST)
          .then(({ text }) => {
            expect(JSON.parse(text)).toEqual({ error: true, message: 'Wrong NLU request parameters error.' })
          })
      })

      it('when model field is not provided in the request payload', async () => {
        const { model, ...malformedRequestParams } = mockedServiceRequest
        const serviceRequest = { ...malformedRequestParams }

        await request
          .get(NLU_PATH)
          .send(serviceRequest)
          .expect(BAD_REQUEST)
          .then(({ text }) => {
            expect(JSON.parse(text)).toEqual({ error: true, message: 'Wrong NLU request parameters error.' })
          })
      })
    })
  })
})
