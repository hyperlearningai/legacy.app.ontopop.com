import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EditOntologyForm from '../../components/EditOntologyForm'
// import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties'
import { OwlClasses } from '../fixtures/test-ontology-classes'

const setup = ({
  operation,
  type
}) => {
  const props = {
    selectedElementProperties: {},
    setSelectedElementProperties: jest.fn(),
    nodesProperties: [],
    edgesProperties: [],
    operation,
    initialData: {},
    classesFromApi: OwlClasses,
    type
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
