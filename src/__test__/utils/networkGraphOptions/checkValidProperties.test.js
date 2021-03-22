import checkValidProperties from '../../../utils/networkGraphOptions/checkValidProperties'

describe('checkValidProperties', () => {
  it('should work correctly no valid properties', async () => {
    const properties = {
      0: {
        type: 'add',
        properties: {
          0: {
            property: '',
            operation: 'add',
            value: 'test'
          },
          1: {
            property: 'test',
            operation: 'add',
            value: ''
          },
        }
      }
    }

    expect(checkValidProperties({
      properties
    })).toEqual([])
  })

  it('should work correctly if valid properties', async () => {
    const properties = {
      0: {
        type: 'add',
        properties: {
          0: {
            property: 'test',
            operation: 'add',
            value: 'test'
          },
          1: {
            property: 'test',
            operation: 'add',
            value: ''
          },
        }
      }
    }

    expect(checkValidProperties({
      properties
    })).toEqual([
      {
        filterProperties: [
          {
            operation: 'add',
            property: 'test',
            value: 'test',
          },
        ],
        type: 'add',
      },
    ])
  })
})
