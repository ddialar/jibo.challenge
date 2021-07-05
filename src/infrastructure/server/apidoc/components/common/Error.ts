export const errorComponent = {
  Error404: {
    type: 'object',
    required: ['error', 'message'],
    properties: {
      error: {
        type: 'boolean',
        description: 'When this flag is included and it is set to \'true\', it indicates that an error has occurred.',
        example: true
      },
      message: {
        type: 'string',
        description: 'Expanded information about the error.',
        example: 'You are asking for something that is not here'
      }
    }
  }
}
