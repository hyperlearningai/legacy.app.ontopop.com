import getTriplesFromApi from '../../../utils/apiCalls/getTriplesFromApi'

const setStoreState = jest.fn()

describe('getTriplesFromApi', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const edges = [{
      edgeId: 11,
      role: 'Provided to',
      edgeProperties: {
        id: 11,
        label: 'subclass',
        objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
        objectPropertyRdfsLabel: 'Provided to',
        edgeId: 11
      },
      sourceNodeId: 1,
      targetNodeId: 170
    },
    {
      edgeId: 12,
      role: 'Subclass of',
      edgeProperties: {
        id: 12,
        label: 'subclass',
        objectPropertyRdfsLabel: 'Subclass of',
        edgeId: 12
      },
      sourceNodeId: 1,
      targetNodeId: 141
    }]

    await getTriplesFromApi({
      setStoreState,
      edges
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'triplesPerNode', {
        1: ['11', '12'],
        141: ['12'],
        170: ['11']
      }
    )
  })
})
