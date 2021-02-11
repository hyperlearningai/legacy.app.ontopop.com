import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties'
import getEdgeObject from '../../../utils/serialiseNodesEdges/getEdgeObject'
import store from '../../../store'

describe('getEdgeObject', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no nodeOverlay', async () => {
    const objectPropertiesFromApi = OwlObjectProperties
    const classesFromApi = OwlClasses
    const isNodeOverlay = false
    const shortestPathResults = []
    const stylingNodeCaptionProperty = 'rdfsLabel'

    store.getState = jest.fn().mockImplementationOnce(() => ({
      stylingNodeCaptionProperty,
      classesFromApi,
      objectPropertiesFromApi,
      isNodeOverlay,
      shortestPathResults
    }))

    const from = 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY'
    const predicate = 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp'
    const to = 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'

    expect(getEdgeObject({
      from,
      predicate,
      to,
      isNodeOverlay,
      objectPropertiesFromApi,
      shortestPathResults,
      classesFromApi
    })).toEqual({
      edgeUniqueId: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
      edgeConnection: {
        from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        fromLabel: 'Communication Document',
        to: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
        toLabel: 'Licence Holder'
      },
      edge: {
        from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        fromLabel: 'Communication Document',
        to: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
        toLabel: 'Licence Holder',
        label: 'Provided to',
        edgeId: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
        id: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
        ...objectPropertiesFromApi['http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp']
      },
      fromObject: {
        rdfAbout: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        rdfsLabel: 'Communication Document',
        skosDefinition: 'Document storing the information conveyed between two or more parties.',
        skosComment: 'A communication will typically have the Licence Holder (Highways England) as one of the parties.',
        skosExample: null,
        owlAnnotationProperties: {
          'http://www.w3.org/2004/02/skos/core#definition': 'Document storing the information conveyed between two or more parties.',
          'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Communications',
          'http://www.w3.org/2004/02/skos/core#comment': 'A communication will typically have the Licence Holder (Highways England) as one of the parties.'
        },
        rdfsSubClassOf: [
          {
            classRdfAbout: 'http://webprotege.stanford.edu/RDLUE0UQz6th3NduA1L3n3u',
            owlRestriction: null
          },
          {
            classRdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
            owlRestriction: {
              objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
              classRdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'
            }
          }
        ],
        id: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        label: 'Communication\nDocument'
      },
      toObject: {
        rdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
        rdfsLabel: 'Licence Holder',
        skosDefinition: 'A legal organisation with agency in the management of the Network and its associated Strategic Road Network Assets.',
        skosComment: null,
        skosExample: null,
        owlAnnotationProperties: {
          'http://www.w3.org/2004/02/skos/core#definition': 'A legal organisation with agency in the management of the Network and its associated Strategic Road Network Assets.',
          'http://webprotege.stanford.edu/R8AWk6f00nQhiAoDl6ujohI': 'GIS RedLine',
          'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Infrastructure Manager, Highways England, HE',
          'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Maintain Design Operate Plan Construct Finance Communications'
        },
        rdfsSubClassOf: [
          {
            classRdfAbout: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
            owlRestriction: {
              objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
              classRdfAbout: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g'
            }
          },
          {
            classRdfAbout: 'http://webprotege.stanford.edu/RTyCIe0sZbCvkp6VVWaYGs',
            owlRestriction: null
          },
          {
            classRdfAbout: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
            owlRestriction: {
              objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
              classRdfAbout: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6'
            }
          },
          {
            classRdfAbout: 'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n',
            owlRestriction: {
              objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
              classRdfAbout: 'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n'
            }
          }
        ],
        id: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
        label: 'Licence\nHolder'
      }
    })
  })

  it('should work correctly when nodeOverlay and not in path', async () => {
    const objectPropertiesFromApi = OwlObjectProperties
    const classesFromApi = OwlClasses
    const isNodeOverlay = true
    const shortestPathResults = ['http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovTEST___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1234']
    const stylingNodeCaptionProperty = 'rdfsLabel'

    store.getState = jest.fn().mockImplementationOnce(() => ({
      stylingNodeCaptionProperty,
      classesFromApi,
      objectPropertiesFromApi,
      isNodeOverlay,
      shortestPathResults
    }))

    const from = 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY'
    const predicate = 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp'
    const to = 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'

    expect(getEdgeObject({
      from,
      predicate,
      to,
      isNodeOverlay,
      objectPropertiesFromApi,
      shortestPathResults,
      classesFromApi
    })).toEqual({
      edgeUniqueId: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
      edgeConnection: {
        from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        fromLabel: 'Communication Document',
        to: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
        toLabel: 'Licence Holder'
      },
      edge: {
        arrows: {
          to: {
            scaleFactor: 0.2,
          },
        },
        dashes: true,
        width: 0.2,
        from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        fromLabel: 'Communication Document',
        to: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
        toLabel: 'Licence Holder',
        label: 'Provided to',
        edgeId: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
        id: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
        ...objectPropertiesFromApi['http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp']
      },
      fromObject: {
        rdfAbout: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        rdfsLabel: 'Communication Document',
        skosDefinition: 'Document storing the information conveyed between two or more parties.',
        skosComment: 'A communication will typically have the Licence Holder (Highways England) as one of the parties.',
        skosExample: null,
        owlAnnotationProperties: {
          'http://www.w3.org/2004/02/skos/core#definition': 'Document storing the information conveyed between two or more parties.',
          'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Communications',
          'http://www.w3.org/2004/02/skos/core#comment': 'A communication will typically have the Licence Holder (Highways England) as one of the parties.'
        },
        rdfsSubClassOf: [
          {
            classRdfAbout: 'http://webprotege.stanford.edu/RDLUE0UQz6th3NduA1L3n3u',
            owlRestriction: null
          },
          {
            classRdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
            owlRestriction: {
              objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
              classRdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'
            }
          }
        ],
        id: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        label: 'Communication\nDocument'
      },
      toObject: {
        rdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
        rdfsLabel: 'Licence Holder',
        skosDefinition: 'A legal organisation with agency in the management of the Network and its associated Strategic Road Network Assets.',
        skosComment: null,
        skosExample: null,
        owlAnnotationProperties: {
          'http://www.w3.org/2004/02/skos/core#definition': 'A legal organisation with agency in the management of the Network and its associated Strategic Road Network Assets.',
          'http://webprotege.stanford.edu/R8AWk6f00nQhiAoDl6ujohI': 'GIS RedLine',
          'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Infrastructure Manager, Highways England, HE',
          'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Maintain Design Operate Plan Construct Finance Communications'
        },
        rdfsSubClassOf: [
          {
            classRdfAbout: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
            owlRestriction: {
              objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
              classRdfAbout: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g'
            }
          },
          {
            classRdfAbout: 'http://webprotege.stanford.edu/RTyCIe0sZbCvkp6VVWaYGs',
            owlRestriction: null
          },
          {
            classRdfAbout: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
            owlRestriction: {
              objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
              classRdfAbout: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6'
            }
          },
          {
            classRdfAbout: 'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n',
            owlRestriction: {
              objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
              classRdfAbout: 'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n'
            }
          }
        ],
        id: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
        label: 'Licence\nHolder'
      }
    })
  })

  it('should work correctly when nodeOverlay and not in path', async () => {
    const from = 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY'
    const predicate = 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp'
    const to = 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'

    const objectPropertiesFromApi = OwlObjectProperties
    const classesFromApi = OwlClasses
    const isNodeOverlay = true
    const shortestPathResults = [`${predicate}___${from}___${to}`]
    const stylingNodeCaptionProperty = 'rdfsLabel'

    store.getState = jest.fn().mockImplementationOnce(() => ({
      stylingNodeCaptionProperty,
      classesFromApi,
      objectPropertiesFromApi,
      isNodeOverlay,
      shortestPathResults
    }))

    expect(getEdgeObject({
      from,
      predicate,
      to,
      isNodeOverlay,
      objectPropertiesFromApi,
      shortestPathResults,
      classesFromApi
    })).toEqual({
      edgeUniqueId: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
      edgeConnection: {
        from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        fromLabel: 'Communication Document',
        to: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
        toLabel: 'Licence Holder'
      },
      edge: {
        dashes: false,
        width: 3,
        from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        fromLabel: 'Communication Document',
        to: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
        toLabel: 'Licence Holder',
        label: 'Provided to',
        edgeId: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
        id: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
        ...objectPropertiesFromApi['http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp']
      },
      fromObject: {
        rdfAbout: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        rdfsLabel: 'Communication Document',
        skosDefinition: 'Document storing the information conveyed between two or more parties.',
        skosComment: 'A communication will typically have the Licence Holder (Highways England) as one of the parties.',
        skosExample: null,
        owlAnnotationProperties: {
          'http://www.w3.org/2004/02/skos/core#definition': 'Document storing the information conveyed between two or more parties.',
          'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Communications',
          'http://www.w3.org/2004/02/skos/core#comment': 'A communication will typically have the Licence Holder (Highways England) as one of the parties.'
        },
        rdfsSubClassOf: [
          {
            classRdfAbout: 'http://webprotege.stanford.edu/RDLUE0UQz6th3NduA1L3n3u',
            owlRestriction: null
          },
          {
            classRdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
            owlRestriction: {
              objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
              classRdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'
            }
          }
        ],
        id: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        label: 'Communication\nDocument'
      },
      toObject: {
        rdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
        rdfsLabel: 'Licence Holder',
        skosDefinition: 'A legal organisation with agency in the management of the Network and its associated Strategic Road Network Assets.',
        skosComment: null,
        skosExample: null,
        owlAnnotationProperties: {
          'http://www.w3.org/2004/02/skos/core#definition': 'A legal organisation with agency in the management of the Network and its associated Strategic Road Network Assets.',
          'http://webprotege.stanford.edu/R8AWk6f00nQhiAoDl6ujohI': 'GIS RedLine',
          'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Infrastructure Manager, Highways England, HE',
          'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Maintain Design Operate Plan Construct Finance Communications'
        },
        rdfsSubClassOf: [
          {
            classRdfAbout: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
            owlRestriction: {
              objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
              classRdfAbout: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g'
            }
          },
          {
            classRdfAbout: 'http://webprotege.stanford.edu/RTyCIe0sZbCvkp6VVWaYGs',
            owlRestriction: null
          },
          {
            classRdfAbout: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
            owlRestriction: {
              objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
              classRdfAbout: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6'
            }
          },
          {
            classRdfAbout: 'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n',
            owlRestriction: {
              objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
              classRdfAbout: 'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n'
            }
          }
        ],
        id: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
        label: 'Licence\nHolder'
      }
    })
  })
})
