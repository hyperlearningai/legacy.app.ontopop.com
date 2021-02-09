import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EditOntologyAddEdgeNode from '../../components/EditOntologyAddEdgeNode'
import { OwlClasses } from '../fixtures/test-ontology-classes'
import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties'

const setup = () => {
  const props = {
    type: 'node',
    opearation: 'add',
    setStoreState: jest.fn(),
    addToArray: jest.fn(),
    removeFromObject: jest.fn(),
    addToObject: jest.fn(),
    classesFromApi: OwlClasses,
    objectPropertiesFromApi: OwlObjectProperties
  }

  const component = shallow(<EditOntologyAddEdgeNode {...props} />)

  return {
    component,
    props
  }
}

describe('EditOntologyAddEdgeNode', () => {
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
