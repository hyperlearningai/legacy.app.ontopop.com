import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EditOntologyDeleteNode from '../../components/EditOntologyDeleteNode'
import { OwlClasses } from '../fixtures/test-ontology-classes'
import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties'
import { REQUIRED_PREDICATES } from '../../constants/graph'

const optionNodes = Object.keys(OwlClasses).map(
  (nodeId) => ({
    value: nodeId,
    label: OwlClasses[nodeId].rdfsLabel || nodeId
  })
)

const optionEdges = Object.keys(OwlObjectProperties).map(
  (edgeId) => ({
    value: edgeId,
    label: OwlObjectProperties[edgeId].rdfsLabel || edgeId
  })
).filter((item) => !REQUIRED_PREDICATES.includes(item.value))

const setup = () => {
  const props = {
    type: 'node',
    opearation: 'add',
    optionNodes,
    optionEdges,
    setStoreState: jest.fn(),
    addToArray: jest.fn(),
    removeFromObject: jest.fn(),
    addToObject: jest.fn(),
  }

  const component = shallow(<EditOntologyDeleteNode {...props} />)

  return {
    component,
    props
  }
}

describe('EditOntologyDeleteNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when type node', () => {
    const {
      component
    } = setup({
      type: 'node'
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when type edge', () => {
    const {
      component
    } = setup({
      type: 'edge'
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
