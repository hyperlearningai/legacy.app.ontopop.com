import getEdgeObject from '../../../utils/graphVisualisation/getEdgeObject'
import store from '../../../store'

describe('getEdgeObject', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const stylingEdgeCaptionProperty = 'rdfsLabel'

    store.getState = jest.fn().mockImplementationOnce(() => ({
      stylingEdgeCaptionProperty,
    }))

    const edge = {
      edgeProperties: {
        objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
        objectPropertyRdfsLabel: 'Provided to',
      },
      rdfsLabel: 'Provided to',
      sourceNodeId: 40,
      targetNodeId: 20,
      edgeId: '11'
    }

    expect(getEdgeObject({
      edge
    })).toEqual({
      from: '40',
      id: '11',
      label: 'Provided to',
      predicate: '11',
      rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
      rdfsLabel: 'Provided to',
      to: '20',
    })
  })
})
