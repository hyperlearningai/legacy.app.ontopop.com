import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EditOntologyAddNode from '../../components/EditOntologyAddNode'
import { classesFromApi } from '../fixtures/classesFromApi'

const setup = () => {
  const props = {
    type: 'node',
    operation: 'add',
    setStoreState: jest.fn(),
    addNumber: jest.fn(),
    classesFromApi
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
