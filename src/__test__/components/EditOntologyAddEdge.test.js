import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EditOntologyAddEdge from '../../components/EditOntologyAddEdge'
import { classesFromApi } from '../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../fixtures/objectPropertiesFromApi'
import { REQUIRED_PREDICATES } from '../../constants/graph'

const optionNodes = Object.keys(classesFromApi).map(
  (nodeId) => ({
    value: nodeId,
    label: classesFromApi[nodeId].rdfsLabel || nodeId
  })
)

const optionEdges = Object.keys(objectPropertiesFromApi).map(
  (edgeId) => ({
    value: edgeId,
    label: objectPropertiesFromApi[edgeId].rdfsLabel || edgeId
  })
).filter((item) => !REQUIRED_PREDICATES.includes(item.value))

const setup = () => {
  const props = {
    type: 'edge',
    opearation: 'add',
    optionNodes,
    optionEdges,
    setStoreState: jest.fn(),
    addToArray: jest.fn(),
    removeFromObject: jest.fn(),
    addToObject: jest.fn(),
  }

  const component = shallow(<EditOntologyAddEdge {...props} />)

  return {
    component,
    props
  }
}

describe('EditOntologyAddEdge', () => {
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
