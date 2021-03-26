import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NodeNeighbourhood from '../../components/NodeNeighbourhood'

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

  const component = shallow(<NodeNeighbourhood {...props} />)

  return {
    component,
    props
  }
}

describe('NodeNeighbourhood', () => {
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
