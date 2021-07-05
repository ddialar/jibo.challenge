export const nluResponse = {
  NluResponse: {
    type: 'object',
    required: ['intents', 'entities', 'confidence'],
    properties: {
      intents: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: `<p>When there are no matching results, this field is returned as empty array.</p>
          <p>In another case, it will return the list of selected values.</p>`
      },
      entities: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: `<p>When there are no matching results, this field is returned as empty array.</p>
          <p>In another case, it will return the list of selected values.</p>`
      },
      confidence: {
        type: 'integer',
        description: `<p>When there are no matching results, this field is returned 0 value.</p>
          <p>In another case, it will return highest confidence value found.</p>`
      }
    }
  }
}
