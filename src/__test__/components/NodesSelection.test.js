import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NodesSelection from '../../components/NodesSelection'

const setup = ({
  selectedElement
}) => {
  const props = {
    updateStoreValue: jest.fn(),
    selectedElement,
    nodesDropdownLabels: [{
      id: '1',
      value: 'node'
    }]
  }

  const component = shallow(<NodesSelection {...props} />)

  return {
    component,
    props
  }
}

describe('NodesSelection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when no selected node', () => {
    const {
      component
    } = setup({
      selectedElement: undefined
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when selected node', () => {
    const {
      component
    } = setup({
      selectedElement: { 1: 'node' }
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
