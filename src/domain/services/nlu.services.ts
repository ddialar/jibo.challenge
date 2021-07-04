import { ServiceRequest, ServiceResponse } from '@types'
import { getNluAData, getNluBData } from '@infrastructure/dataSources'

export const retrieveTheBestResult = async ({ text, utterance, model }: ServiceRequest): Promise<ServiceResponse> => {
  const defaultReturnedResult: ServiceResponse = {
    intents: [],
    entities: [],
    confidence: 0
  }

  return (await Promise
    .allSettled([
      getNluAData({ text, model }),
      getNluBData({ utterance, model })
    ]))
    .filter((rawResult): rawResult is PromiseFulfilledResult<ServiceResponse[] | null> => rawResult.status === 'fulfilled')
    .reduce((mergedBunch: ServiceResponse[], validResult) => validResult.value ? [...mergedBunch, ...validResult.value] : mergedBunch, [])
    .sort((a, b) => b.confidence - a.confidence)
    .filter((sortedElemet, _, sortedCollection) => sortedElemet.confidence === sortedCollection[0].confidence)
    .reduce((finalResult, higherElement) => {
      finalResult.intents = [...finalResult.intents, ...higherElement.intents]
      finalResult.entities = [...finalResult.entities, ...higherElement.entities]
      finalResult.confidence = higherElement.confidence

      return finalResult
    }, defaultReturnedResult)
}
