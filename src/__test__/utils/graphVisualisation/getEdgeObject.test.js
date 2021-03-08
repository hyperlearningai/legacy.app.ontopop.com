import getEdgeObject from '../../../utils/graphVisualisation/getEdgeObject'
import store from '../../../store'

store.getState = jest.fn().mockImplementation(() => ({
  globalEdgeStyling: {
    stylingEdgeCaptionProperty: 'rdfsLabel',
  },
  userDefinedEdgeStyling: {
    stylingEdgeCaptionProperty: 'rdfAbout',
  },
}))

describe('getEdgeObject', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when userDefined', async () => {
    const edge = {
      rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
      rdfsLabel: 'Provided to',
      to: '40',
      from: '20',
      edgeId: '11',
      id: '11',
      userDefined: true
    }

    expect(getEdgeObject({
      edge
    })).toEqual({
      edgeId: '11',
      from: '20',
      id: '11',
      label: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
      rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
      rdfsLabel: 'Provided to',
      to: '40',
      userDefined: true
    })
  })

  it('should work correctly', async () => {
    const edge = {
      rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
      rdfsLabel: 'Provided to',
      to: '40',
      from: '20',
      edgeId: '11',
      id: '11',
      userDefined: false
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
      userDefined: false
    })
  })
})
