export const getNlu = {
  tags: ['NLU'],
  descriptions: 'Retrieves the best result based on the highest confidence.',
  operationId: 'getNlu',
  parameters: [
    {
      in: 'path',
      name: 'text',
      required: true,
      type: 'string',
      example: 'one'
    },
    {
      in: 'path',
      name: 'utterance',
      required: true,
      type: 'string',
      example: 'one'
    },
    {
      in: 'path',
      name: 'model',
      required: true,
      type: 'string',
      example: 'modelA'
    }
  ],
  responses: {
    200: {
      description: 'It returns the NLU information based on the sent request payload.',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/NluResponse'
          }
        }
      }
    },
    404: {
      description: 'It returns a bad request error when the request parameters are not valid.',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error404'
          }
        }
      }
    }
  }
}
