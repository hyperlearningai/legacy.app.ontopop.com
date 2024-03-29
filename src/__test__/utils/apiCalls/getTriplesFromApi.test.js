import getTriplesFromApi from '../../../utils/apiCalls/getTriplesFromApi'

const updateStoreValue = jest.fn()

describe('getTriplesFromApi', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const edges = [{
      id: '11',
      role: 'Provided to',
      label: 'subclass',
      rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
      rdfsLabel: 'Provided to',
      from: '1',
      to: '170'
    },
    {
      id: '12',
      role: 'Subclass of',
      label: 'subclass',
      rdfsLabel: 'Subclass of',
      from: '1',
      to: '141'
    }]

    await getTriplesFromApi({
      updateStoreValue,
      edges
    })

    expect(updateStoreValue.mock.calls).toEqual(
      [[['totalEdgesPerNode'], 'update', {
        1: ['11',
          '12'],
        141: ['12'],
        170: ['11']
      }], [
        ['totalEdgesPerNodeBackup'],
        'update', {
          1: ['11',
            '12'],
          141: ['12'],
          170: ['11']
        }]]
    )
  })
})
