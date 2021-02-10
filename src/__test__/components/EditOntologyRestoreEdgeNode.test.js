import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EditOntologyRestoreEdgeNode from '../../components/EditOntologyRestoreEdgeNode'

const setup = ({
  type,
  optionNodes,
  optionEdges
}) => {
  const props = {
    type,
    opearation: 'restore',
    setStoreState: jest.fn(),
    addToArray: jest.fn(),
    removeFromObject: jest.fn(),
    addToObject: jest.fn(),
    optionNodes,
    optionEdges
  }

  const component = shallow(<EditOntologyRestoreEdgeNode {...props} />)

  return {
    component,
    props
  }
}

describe('EditOntologyRestoreEdgeNode', () => {
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
