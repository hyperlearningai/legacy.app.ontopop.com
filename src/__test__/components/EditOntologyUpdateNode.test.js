import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EditOntologyUpdateNode from '../../components/EditOntologyUpdateNode'
import { classesFromApi } from '../fixtures/classesFromApi'

const setup = () => {
  const props = {
    operation: 'update',
    updateStoreValue: jest.fn(),
    optionNodes: [{
      label: 'Node',
      value: 'node'
    }],
    classesFromApi,
  }

  const component = shallow(<EditOntologyUpdateNode {...props} />)

  return {
    component,
    props
  }
}

describe('EditOntologyUpdateNode', () => {
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
