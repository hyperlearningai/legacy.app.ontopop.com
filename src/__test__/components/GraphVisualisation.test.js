import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { DataSet } from 'vis-data'
import GraphVisualisation from '../../components/GraphVisualisation'
import { OwlClasses } from '../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties'
import { triplesPerNode } from '../fixtures/triplesPerNode'

const setup = () => {
  const props = {
    availableEdges: new DataSet([]),
    availableNodes: new DataSet([]),
    addToArray: jest.fn(),
    classesFromApi: OwlClasses,
    edgesIdsToDisplay: [
      'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
      'http://webprotege.stanford.edu/RBXkLIHl4DLxgRus9nf68fU'
    ],
    highlightedNodes: [],
    network: {},
    nodesIdsToDisplay: [],
    objectPropertiesFromApi: OwlObjectProperties,
    physicsEdgeLength: true,
    physicsHierarchicalView: true,
    physicsRepulsion: true,
    // searchFilter: '',
    setStoreState: jest.fn(),
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
