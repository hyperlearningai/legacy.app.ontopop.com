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
      rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
      rdfsLabel: 'Provided to',
      to: '40',
      from: '20',
      edgeId: '11',
      id: '11',
    }

    expect(getEdgeObject({
      edge
    })).toEqual({
      edgeId: '11',
      from: '20',
      id: '11',
      label: 'Provided to',
      rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
      rdfsLabel: 'Provided to',
      to: '40',
    })
  })
})
