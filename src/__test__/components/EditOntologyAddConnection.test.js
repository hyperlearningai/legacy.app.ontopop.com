import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { DataSet } from 'vis-data'
import EditOntologyAddConnection from '../../components/EditOntologyAddConnection'
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
    availableEdges: new DataSet([])
  }

  const component = shallow(<EditOntologyAddConnection {...props} />)

  return {
    component,
    props
  }
}

describe('EditOntologyAddConnection', () => {
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
