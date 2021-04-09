import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ElementsSelection from '../../components/ElementsSelection'

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

  const component = shallow(<ElementsSelection {...props} />)

  return {
    component,
    props
  }
}

describe('ElementsSelection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when no selected element', () => {
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

  it('should match snapshot when selected edge', () => {
    const {
      component
    } = setup({
      selectedElement: { 2: 'edge' }
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
