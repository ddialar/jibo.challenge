import supertest, { SuperTest, Test } from 'supertest'

import { NluARestApi, NluBRestApi } from '@infrastructure/api'
import { OK, NOT_FOUND } from '@errors'
import { server } from '@infrastructure/server'
import {
  mockedServiceRequest,
  mockedNluARawData,
  mockedNluBRawData,
  mockedErrorReply
} from '@testingFixtures'

const NLU_PATH = '/nlu'

describe('[ SERVER ] - NLU endpoints', () => {
  describe(`[ GET ] ${NLU_PATH}/:text/:utterance/:model`, () => {
    const request: SuperTest<Test> = supertest(server)

    describe('returns OK (200) and a valid response', () => {
      afterEach(() => {
        jest.spyOn(NluARestApi, 'getNluAData').mockRestore()
        jest.spyOn(NluBRestApi, 'getNluBData').mockRestore()
      })

      it('when service NLU_A result has a higher condidence', async () => {
        jest.spyOn(NluARestApi, 'getNluAData').mockResolvedValue({ ...mockedNluARawData, confidence: 1000 })
        jest.spyOn(NluBRestApi, 'getNluBData').mockResolvedValue(mockedNluBRawData)

        const { text, utterance, model } = mockedServiceRequest
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
          .get(`${NLU_PATH}/${text}/${utterance}/${model}`)
          .expect(OK)
          .then(({ body }) => {
            expect(body).toStrictEqual(expectedResult)
          })
      })

      it('when service NLU_B result has a higher condidence', async () => {
        jest.spyOn(NluARestApi, 'getNluAData').mockResolvedValue({ ...mockedNluARawData, confidence: 9 })
        jest.spyOn(NluBRestApi, 'getNluBData').mockResolvedValue(mockedNluBRawData)

        const { text, utterance, model } = mockedServiceRequest
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
          .get(`${NLU_PATH}/${text}/${utterance}/${model}`)
          .expect(OK)
          .then(({ body }) => {
            expect(body).toStrictEqual(expectedResult)
          })
      })

      it('based on the merging results of external services with the same confidence', async () => {
        jest.spyOn(NluARestApi, 'getNluAData').mockResolvedValue(mockedNluARawData)
        jest.spyOn(NluBRestApi, 'getNluBData').mockResolvedValue(mockedNluBRawData)

        const { text, utterance, model } = mockedServiceRequest
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
          .get(`${NLU_PATH}/${text}/${utterance}/${model}`)
          .expect(OK)
          .then(({ body }) => {
            expect(body).toStrictEqual(expectedResult)
          })
      })

      it('even when service NLU_A fails', async () => {
        jest.spyOn(NluARestApi, 'getNluAData').mockResolvedValue(mockedErrorReply)
        jest.spyOn(NluBRestApi, 'getNluBData').mockResolvedValue(mockedNluBRawData)

        const { text, utterance, model } = mockedServiceRequest
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
          .get(`${NLU_PATH}/${text}/${utterance}/${model}`)
          .expect(OK)
          .then(({ body }) => {
            expect(body).toStrictEqual(expectedResult)
          })
      })

      it('even when service NLU_B fails', async () => {
        jest.spyOn(NluARestApi, 'getNluAData').mockResolvedValue(mockedNluARawData)
        jest.spyOn(NluBRestApi, 'getNluBData').mockResolvedValue(mockedErrorReply)

        const { text, utterance, model } = mockedServiceRequest
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
          .get(`${NLU_PATH}/${text}/${utterance}/${model}`)
          .expect(OK)
          .then(({ body }) => {
            expect(body).toStrictEqual(expectedResult)
          })
      })

      it('even when third party services return non valida data', async () => {
        jest.spyOn(NluARestApi, 'getNluAData').mockResolvedValue({})
        jest.spyOn(NluBRestApi, 'getNluBData').mockResolvedValue({})

        const { text, utterance, model } = mockedServiceRequest
        const expectedResult = {
          intents: [],
          entities: [],
          confidence: 0
        }

        await request
          .get(`${NLU_PATH}/${text}/${utterance}/${model}`)
          .expect(OK)
          .then(({ body }) => {
            expect(body).toStrictEqual(expectedResult)
          })
      })

      it('even when third party services fail', async () => {
        jest.spyOn(NluARestApi, 'getNluAData').mockResolvedValue(mockedErrorReply)
        jest.spyOn(NluBRestApi, 'getNluBData').mockResolvedValue(mockedErrorReply)

        const { text, utterance, model } = mockedServiceRequest
        const expectedResult = {
          intents: [],
          entities: [],
          confidence: 0
        }

        await request
          .get(`${NLU_PATH}/${text}/${utterance}/${model}`)
          .expect(OK)
          .then(({ body }) => {
            expect(body).toStrictEqual(expectedResult)
          })
      })
    })

    describe('returns NOT_FOUND (404) and a valid response', () => {
      const expectedErrorObject = { error: true, message: 'Route not found.' }

      it('when request params are not provided', async () => {
        await request
          .get(NLU_PATH)
          .expect(NOT_FOUND)
          .then(({ text }) => {
            expect(JSON.parse(text)).toEqual(expectedErrorObject)
          })
      })

      it('when text field is not provided as request param', async () => {
        const { utterance, model } = mockedServiceRequest

        await request
          .get(`${NLU_PATH}/${utterance}/${model}`)
          .expect(NOT_FOUND)
          .then(({ text }) => {
            expect(JSON.parse(text)).toEqual(expectedErrorObject)
          })
      })

      it('when utterance field is not provided as request param', async () => {
        const { text, model } = mockedServiceRequest

        await request
          .get(`${NLU_PATH}/${text}/${model}`)
          .expect(NOT_FOUND)
          .then(({ text }) => {
            expect(JSON.parse(text)).toEqual(expectedErrorObject)
          })
      })

      it('when model field is not provided as request param', async () => {
        const { text, utterance } = mockedServiceRequest

        await request
          .get(`${NLU_PATH}/${text}/${utterance}`)
          .expect(NOT_FOUND)
          .then(({ text }) => {
            expect(JSON.parse(text)).toEqual(expectedErrorObject)
          })
      })
    })
  })
})
