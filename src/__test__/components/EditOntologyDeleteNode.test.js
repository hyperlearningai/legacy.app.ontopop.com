import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EditOntologyDeleteNode from '../../components/EditOntologyDeleteNode'
import { classesFromApi } from '../fixtures/classesFromApi'

const optionNodes = Object.keys(classesFromApi).map(
  (nodeId) => ({
    value: nodeId,
    label: classesFromApi[nodeId].rdfsLabel || nodeId
  })
)

const setup = () => {
  const props = {
    type: 'node',
    operation: 'add',
    optionNodes,
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

  it('should match snapshot', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
