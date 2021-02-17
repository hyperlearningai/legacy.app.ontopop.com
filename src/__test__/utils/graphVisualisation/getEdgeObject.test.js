import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties'
import getEdgeObject from '../../../utils/graphVisualisation/getEdgeObject'
import store from '../../../store'

describe('getEdgeObject', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no nodeOverlay', async () => {
    const objectPropertiesFromApi = OwlObjectProperties
    const classesFromApi = OwlClasses
    const stylingNodeCaptionProperty = 'rdfsLabel'

    store.getState = jest.fn().mockImplementationOnce(() => ({
      stylingNodeCaptionProperty,
      classesFromApi,
      objectPropertiesFromApi,
    }))

    const from = 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY'
    const predicate = 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp'
    const to = 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'

    expect(getEdgeObject({
      from,
      predicate,
      to,
    })).toEqual({
      edge: {
        from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        id: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
        label: 'Provided to',
        owlAnnotationProperties: {
          'http://webprotege.stanford.edu/RtMeQat8p1tL74b64dS2qs': 'Transfer',
          'http://www.w3.org/2004/02/skos/core#comment': 'The difference with "Issued to" is that "Issued to" implies there is a legal or contractural arrangement applied.',
          'http://www.w3.org/2004/02/skos/core#definition': 'Relationship that specifies the receiver of an Entity that has been sent out or put forth.',
        },
        predicate: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
        rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
        rdfsLabel: 'Provided to',
        rdfsSubPropertyOf: [
          'http://webprotege.stanford.edu/R864k4trK0sb0XWCVmIQkLN',
        ],
        skosComment: 'The difference with "Issued to" is that "Issued to" implies there is a legal or contractural arrangement applied.',
        skosDefinition: 'Relationship that specifies the receiver of an Entity that has been sent out or put forth.',
        to: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
      },
      edgeConnection: {
        from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        to: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
      },
      fromObject: {
        id: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        label: 'Communication\nDocument',
        owlAnnotationProperties: {
          'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Communications',
          'http://www.w3.org/2004/02/skos/core#comment': 'A communication will typically have the Licence Holder (Highways England) as one of the parties.',
          'http://www.w3.org/2004/02/skos/core#definition': 'Document storing the information conveyed between two or more parties.',
        },
        rdfAbout: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        rdfsLabel: 'Communication Document',
        rdfsSubClassOf: [
          {
            classRdfAbout: 'http://webprotege.stanford.edu/RDLUE0UQz6th3NduA1L3n3u',
            owlRestriction: null,
          },
          {
            classRdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
            owlRestriction: {
              classRdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
              objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
            },
          },
        ],
        skosComment: 'A communication will typically have the Licence Holder (Highways England) as one of the parties.',
        skosDefinition: 'Document storing the information conveyed between two or more parties.',
        skosExample: null,
      },
      id: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
      toObject: {
        id: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
        label: 'Licence\nHolder',
        owlAnnotationProperties: {
          'http://webprotege.stanford.edu/R8AWk6f00nQhiAoDl6ujohI': 'GIS RedLine',
          'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Infrastructure Manager, Highways England, HE',
          'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Maintain Design Operate Plan Construct Finance Communications',
          'http://www.w3.org/2004/02/skos/core#definition': 'A legal organisation with agency in the management of the Network and its associated Strategic Road Network Assets.',
        },
        rdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
        rdfsLabel: 'Licence Holder',
        rdfsSubClassOf: [
          {
            classRdfAbout: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
            owlRestriction: {
              classRdfAbout: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
              objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
            },
          },
          {
            classRdfAbout: 'http://webprotege.stanford.edu/RTyCIe0sZbCvkp6VVWaYGs',
            owlRestriction: null,
          },
          {
            classRdfAbout: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
            owlRestriction: {
              classRdfAbout: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
              objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
            },
          },
          {
            classRdfAbout: 'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n',
            owlRestriction: {
              classRdfAbout: 'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n',
              objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
            },
          },
        ],
        skosComment: null,
        skosDefinition: 'A legal organisation with agency in the management of the Network and its associated Strategic Road Network Assets.',
        skosExample: null,
      },
    })
  })
})
