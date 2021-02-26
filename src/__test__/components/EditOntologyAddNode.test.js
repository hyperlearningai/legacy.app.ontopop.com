import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EditOntologyAddNode from '../../components/EditOntologyAddNode'
import { classesFromApi } from '../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../fixtures/objectPropertiesFromApi'

const setup = () => {
  const props = {
    type: 'node',
    opearation: 'add',
    setStoreState: jest.fn(),
    addToArray: jest.fn(),
    removeFromObject: jest.fn(),
    addToObject: jest.fn(),
    classesFromApi,
    objectPropertiesFromApi
  }

  const component = shallow(<EditOntologyAddNode {...props} />)

  return {
    component,
    props
  }
}

describe('EditOntologyAddNode', () => {
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
