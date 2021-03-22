import checkVisibilityByProperty from '../../../utils/networkGraphOptions/checkVisibilityByProperty'

const element = {
  rdfsLabel: 'Traffic signal',
}

describe('checkVisibilityByProperty', () => {
  it('should work correctly if no valid properties', async () => {
    const properties = []

    expect(checkVisibilityByProperty({
      element,
      properties
    })).toEqual(false)
  })

  it('should work correctly if AND type', async () => {
    const properties = [
      {
        filterProperties: [
          {
            operation: 'equal',
            property: 'rdfsLabel',
            value: 'test',
          },
          {
            operation: 'notContains',
            property: 'rdfsLabel',
            value: 'test',
          },
        ],
        type: 'and',
      },
    ]

    expect(checkVisibilityByProperty({
      element,
      properties
    })).toEqual(false)
  })

  it('should work correctly if OR type', async () => {
    const properties = [
      {
        filterProperties: [
          {
            operation: 'equal',
            property: 'rdfsLabel',
            value: 'test',
          },
          {
            operation: 'notContains',
            property: 'rdfsLabel',
            value: 'test',
          },
        ],
        type: 'or',
      }
    ]

    expect(checkVisibilityByProperty({
      element,
      properties
    })).toEqual(true)
  })

  it('should work correctly if multi AND type', async () => {
    const properties = [
      {
        filterProperties: [
          {
            operation: 'notContains',
            property: 'rdfsLabel',
            value: 'test1',
          },
          {
            operation: 'notContains',
            property: 'rdfsLabel',
            value: 'test2',
          },
        ],
        type: 'and',
      },
      {
        filterProperties: [
          {
            operation: 'notEqual',
            property: 'rdfsLabel',
            value: 'test3',
          },
          {
            operation: 'notEqual',
            property: 'rdfsLabel',
            value: 'test4',
          },
        ],
        type: 'and',
      },
    ]

    expect(checkVisibilityByProperty({
      element,
      properties
    })).toEqual(true)
  })

  it('should work correctly if mixed type and false', async () => {
    const properties = [
      {
        filterProperties: [
          {
            operation: 'contains',
            property: 'rdfsLabel',
            value: 'test1',
          },
          {
            operation: 'notContains',
            property: 'rdfsLabel',
            value: 'test2',
          },
        ],
        type: 'and',
      },
      {
        filterProperties: [
          {
            operation: 'notEqual',
            property: 'rdfsLabel',
            value: 'test3',
          },
          {
            operation: 'notEqual',
            property: 'rdfsLabel',
            value: 'test4',
          },
        ],
        type: 'or',
      },
    ]

    expect(checkVisibilityByProperty({
      element,
      properties
    })).toEqual(false)
  })

  it('should work correctly if multi OR type', async () => {
    const properties = [
      {
        filterProperties: [
          {
            operation: 'notContains',
            property: 'rdfsLabel',
            value: 'test1',
          },
          {
            operation: 'notContains',
            property: 'rdfsLabel',
            value: 'test2',
          },
        ],
        type: 'or',
      },
      {
        filterProperties: [
          {
            operation: 'notEqual',
            property: 'rdfsLabel',
            value: 'test3',
          },
          {
            operation: 'notEqual',
            property: 'rdfsLabel',
            value: 'test4',
          },
        ],
        type: 'or',
      },
    ]

    expect(checkVisibilityByProperty({
      element,
      properties
    })).toEqual(true)
  })
})
