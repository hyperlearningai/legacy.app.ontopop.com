import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import GraphVisualisation from '../../components/GraphVisualisation'
import { OwlClasses } from '../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties'

const setup = () => {
  const props = {
    availableNodes: [],
    availableEdges: [],
    setStoreState: jest.fn(),
    selectedNodes: [],
    searchFilter: '',
    // edgesToIgnore: [],
    physicsHierarchicalView: true,
    physicsRepulsion: true,
    physicsEdgeLength: true,
    isEdgeSelectable: true,
    classesFromApi: OwlClasses,
    objectPropertiesFromApi: OwlObjectProperties,
    nodesIdsToDisplay: [],
    deletedNodes: [],
    isNodeSelectable: true,
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
