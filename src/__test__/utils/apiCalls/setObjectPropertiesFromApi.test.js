import setObjectPropertiesFromApi from '../../../utils/apiCalls/setObjectPropertiesFromApi'

const setStoreState = jest.fn()

describe('setObjectPropertiesFromApi', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return data', async () => {
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

    await setObjectPropertiesFromApi({
      setStoreState,
      edges
    })

    expect(setStoreState.mock.calls).toEqual(
      [['objectPropertiesFromApi', {
        11: {
          edgeId: 11,
          edgeProperties: {
            edgeId: 11,
            id: 11,
            label: 'subclass',
            objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
            objectPropertyRdfsLabel: 'Provided to'
          },
          rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
          rdfsLabel: 'Provided to',
          id: '11',
          label: 'Provided to',
          role: 'Provided to',
          sourceNodeId: 1,
          targetNodeId: 170
        },
        12: {
          edgeId: 12,
          edgeProperties: {
            edgeId: 12,
            id: 12,
            label: 'subclass',
            objectPropertyRdfsLabel: 'Subclass of'
          },
          rdfAbout: undefined,
          rdfsLabel: 'Subclass of',
          id: '12',
          label: 'Subclass of',
          role: 'Subclass of',
          sourceNodeId: 1,
          targetNodeId: 141
        }
      }],
      ['objectPropertiesFromApiBackup', {
        11: {
          edgeId: 11,
          edgeProperties: {
            edgeId: 11,
            id: 11,
            label: 'subclass',
            objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
            objectPropertyRdfsLabel: 'Provided to'
          },
          id: '11',
          rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
          rdfsLabel: 'Provided to',
          label: 'Provided to',
          role: 'Provided to',
          sourceNodeId: 1,
          targetNodeId: 170
        },
        12: {
          edgeId: 12,
          edgeProperties: {
            edgeId: 12,
            id: 12,
            label: 'subclass',
            objectPropertyRdfsLabel: 'Subclass of'
          },
          id: '12',
          label: 'Subclass of',
          role: 'Subclass of',
          rdfAbout: undefined,
          rdfsLabel: 'Subclass of',
          sourceNodeId: 1,
          targetNodeId: 141
        }
      }]]
    )
  })
})
