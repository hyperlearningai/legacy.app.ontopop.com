import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { DataSet } from 'vis-data'
import GraphVisualisation from '../../components/GraphVisualisation'

const setup = () => {
  const props = {
    availableEdges: new DataSet([]),
    availableNodes: new DataSet([]),
    addToArray: jest.fn(),
    network: {},
    nodesIdsToDisplay: [],
    physicsEdgeLength: true,
    physicsHierarchicalView: true,
    physicsRepulsion: true,
    setStoreState: jest.fn(),
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
