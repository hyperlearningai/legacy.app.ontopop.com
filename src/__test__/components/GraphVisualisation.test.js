import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import GraphVisualisation from '../../components/GraphVisualisation'
import { OwlClasses } from '../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties'
import { triplesPerNode } from '../fixtures/triplesPerNode'

const setup = () => {
  const props = {
    addToArray: jest.fn(),
    availableEdges: [],
    availableNodes: [],
    classesFromApi: OwlClasses,
    currentGraph: 'graph-0',
    edgesIdsToDisplay: [
      'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
      'http://webprotege.stanford.edu/RBXkLIHl4DLxgRus9nf68fU'
    ],
    // edgesToIgnore: [],
    graphData: {
      'graph-0': {
        label: 'graph-0'
      }
    },
    highlightedNodes: [],
    isEdgeSelectable: true,
    isNeighbourNodeSelectable: true,
    isNodeSelectable: true,
    network: {},
    nodesIdsToDisplay: [],
    objectPropertiesFromApi: OwlObjectProperties,
    physicsEdgeLength: true,
    physicsHierarchicalView: true,
    physicsRepulsion: true,
    selectedNeighbourNode: [],
    selectedNodes: [],
    setStoreState: jest.fn(),
    searchFilter: '',
    triplesPerNode
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
