import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EditOntologyUpdateEdgeNode from '../../components/EditOntologyUpdateEdgeNode'
import { OwlClasses } from '../fixtures/test-ontology-classes'
import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties'

const setup = () => {
  const props = {
    type: 'node',
    opearation: 'update',
    setStoreState: jest.fn(),
    addToArray: jest.fn(),
    removeFromObject: jest.fn(),
    addToObject: jest.fn(),
    optionNodes: [{
      label: 'Node',
      value: 'node'
    }],
    optionEdges: [{
      label: 'Edge',
      value: 'edge'
    }],
    classesFromApi: OwlClasses,
    objectPropertiesFromApi: OwlObjectProperties
  }

  const component = shallow(<EditOntologyUpdateEdgeNode {...props} />)

  return {
    component,
    props
  }
}

describe('EditOntologyUpdateEdgeNode', () => {
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
