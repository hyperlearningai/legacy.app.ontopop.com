import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EditOntologyForm from '../../components/EditOntologyForm'

const setup = ({
  operation,
}) => {
  const props = {
    selectedElementProperties: {},
    setSelectedElementProperties: jest.fn(),
    annotationProperties: [],
    operation,
    initialData: {},
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

  it('should match snapshot when update operation', () => {
    const {
      component
    } = setup({
      operation: 'update',
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when add operation', () => {
    const {
      component
    } = setup({
      operation: 'add',
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
