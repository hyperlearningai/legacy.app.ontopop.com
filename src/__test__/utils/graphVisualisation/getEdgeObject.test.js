import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import getEdgeObject from '../../../utils/graphVisualisation/getEdgeObject'
import store from '../../../store'

describe('getEdgeObject', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no nodeOverlay', async () => {
    const stylingNodeCaptionProperty = 'rdfsLabel'

    store.getState = jest.fn().mockImplementationOnce(() => ({
      stylingNodeCaptionProperty,
      classesFromApi,
      objectPropertiesFromApi,
    }))

    const from = 1
    const predicate = 11
    const to = 170

    expect(getEdgeObject({
      from,
      predicate,
      to,
    })).toEqual({
      edge: {
        edgeId: 11,
        edgeProperties: {
          edgeId: 11,
          id: 11,
          label: 'subclass',
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
          objectPropertyRdfsLabel: 'Provided to',
        },
        from: 1,
        id: 11,
        label: undefined,
        predicate: 11,
        role: 'Provided to',
        sourceNodeId: 1,
        targetNodeId: 170,
        to: 170,
      },
      edgeConnection: {
        from: 1,
        to: 170,
      },
      fromObject: {
        'Business Area': 'Communications',
        id: 1,
        label: 'Communication\nDocument',
        nodeId: 1,
        rdfAbout: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        rdfsLabel: 'Communication Document',
        skosComment: 'A communication will typically have the Licence Holder (Highways England) as one of the parties.',
        skosDefinition: 'Document storing the information conveyed between two or more parties.',
        userDefined: false,
      },
      id: 11,
      toObject: {
        'Business Area': 'Maintain Design Operate Plan Construct Finance Communications',
        Subdomain: 'GIS RedLine',
        Synonym: 'Infrastructure Manager, Highways England, HE',
        id: 170,
        label: 'Licence\nHolder',
        nodeId: 170,
        rdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
        rdfsLabel: 'Licence Holder',
        skosDefinition: 'A legal organisation with agency in the management of the Network and its associated Strategic Road Network Assets.',
        userDefined: false,
      },
    })
  })
})
