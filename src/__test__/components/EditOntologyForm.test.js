import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EditOntologyForm from '../../components/EditOntologyForm'
import { objectPropertiesFromApi } from '../fixtures/objectPropertiesFromApi'
import { classesFromApi } from '../fixtures/classesFromApi'

const setup = ({
  operation,
  type
}) => {
  const props = {
    selectedElementProperties: {},
    setSelectedElementProperties: jest.fn(),
    annotationProperties: [],
    operation,
    initialData: {},
    classesFromApi,
    type,
    objectPropertiesFromApi
  }

  const component = shallow(<EditOntologyForm {...props} />)

  return {
    component,
    props
  }
}

describe('EditOntologyForm', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when update operation and node type', () => {
    const {
      component
    } = setup({
      operation: 'update',
      type: 'node'
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when update operation and edge type', () => {
    const {
      component
    } = setup({
      operation: 'update',
      type: 'edge'
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when add operation and node type', () => {
    const {
      component
    } = setup({
      operation: 'add',
      type: 'node'
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when add operation and edge type', () => {
    const {
      component
    } = setup({
      operation: 'add',
      type: 'edge'
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
