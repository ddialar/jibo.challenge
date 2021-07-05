import { getNlu } from './getNlu.path'

export const nlu = {
  '/nlu/:text/:utterance/:model': {
    get: getNlu
  }
}
