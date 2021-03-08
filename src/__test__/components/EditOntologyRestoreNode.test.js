import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EditOntologyRestoreNode from '../../components/EditOntologyRestoreNode'

const setup = ({
  type,
  optionNodes,
  optionEdges
}) => {
  const props = {
    type,
    operation: 'restore',
    setStoreState: jest.fn(),
    addNumber: jest.fn(),
    optionNodes,
    optionEdges
  }

  const component = shallow(<EditOntologyRestoreNode {...props} />)

  return {
    component,
    props
  }
}

describe('EditOntologyRestoreNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when type node and no options', () => {
    const {
      component
    } = setup({
      type: 'node',
      optionNodes: [],
      optionEdges: [],
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when type edge and no options', () => {
    const {
      component
    } = setup({
      type: 'edge',
      optionNodes: [],
      optionEdges: [],
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when type node and options', () => {
    const {
      component
    } = setup({
      type: 'node',
      optionNodes: [{
        value: 'http://test.test/test',
        label: 'Test'
      }],
      optionEdges: [],
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
