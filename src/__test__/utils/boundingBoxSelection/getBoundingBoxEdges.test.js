import getBoundingBoxEdges from '../../../utils/boundingBoxSelection/getBoundingBoxEdges'
import { triplesPerNode } from '../../fixtures/triplesPerNode.js'

describe('getBoundingBoxEdges', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no nodes', async () => {
    const selectedBoundingBoxNodes = []

    const result = getBoundingBoxEdges({
      selectedBoundingBoxNodes,
      triplesPerNode
    })

    expect(result).toEqual([])
  })

  it('should work correctly', async () => {
    const selectedBoundingBoxNodes = [
      'http://webprotege.stanford.edu/R9H3QGGtwC0XhV4Mfk6Ceep',
      'http://webprotege.stanford.edu/R734t4iI6j8MPmpJsIqO2v4',
      'http://webprotege.stanford.edu/R735Cwtcs6mgZedTI2DBpFK',
      'http://webprotege.stanford.edu/R7hlktFumJq5RpggEzEv2xi',
      'http://webprotege.stanford.edu/R7l0LqjYK03DLCUM5XgsbGk',
      'http://webprotege.stanford.edu/R8MzvxsWzbT1CeZSELKf1Ku',
      'http://webprotege.stanford.edu/R8VPKVDGeDVRPQznK4rL0ea',
      'http://webprotege.stanford.edu/R8mqmfFAtvpjQNyrdiVTAmG',
      'http://webprotege.stanford.edu/R8oNiHimqYAWPxl0guoDLFp',
    ]

    const result = getBoundingBoxEdges({
      selectedBoundingBoxNodes,
      triplesPerNode
    })

    expect(result).toEqual([
      'http://webprotege.stanford.edu/RDWT4jt5mF3fw4zrooDr58g',
      'http://www.w3.org/2000/01/rdf-schema#subclassof',
      'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX',
    ])
  })
})
