import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import GraphVisualisation from '../../components/GraphVisualisation'

const setup = () => {
  const props = {
    availableNodes: [],
    availableEdges: [],
    fitNetwork: false,
    setStoreState: jest.fn(),
    searchFilter: '',
    edgesToIgnore: [],
    physicsHierarchicalView: true,
    physicsRepulsion: true,
    physicsEdgeLength: true,
    classesFromApi: {
      OwlClasses: {
        'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY': {
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
          rdfsSubClassOf: [{
            classRdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
            owlRestriction: {
              objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
              classRdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'
            }
          }]
        },
      },
    },
    objectPropertiesFromApi: {
      OwlObjectProperties: {
        'http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM': {
          rdfAbout: 'http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM',
          rdfsLabel: 'Instantiation of',
          skosDefinition: null,
          skosComment: null,
          owlAnnotationProperties: {
            'http://webprotege.stanford.edu/RtMeQat8p1tL74b64dS2qs': 'Record'
          },
          rdfsSubPropertyOf: ['http://webprotege.stanford.edu/R8zMIKp038MgC2umoxwzWBJ']
        }
      }
    },
    nodesIdsToDisplay: [],
    selectedNode: {},
    deletedNodes: []
  }

  const component = shallow(<GraphVisualisation {...props} />)

  return {
    component,
    props
  }
}

describe('GraphVisualisation', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
