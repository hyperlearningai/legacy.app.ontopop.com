import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EdgesSelection from '../../components/EdgesSelection'

const setup = ({
  selectedElement
}) => {
  const props = {
    updateStoreValue: jest.fn(),
    selectedElement
  }

  const component = shallow(<EdgesSelection {...props} />)

  return {
    component,
    props
  }
}

describe('EdgesSelection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when no selected edge', () => {
    const {
      component
    } = setup({
      selectedElement: undefined
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when selected edge', () => {
    const {
      component
    } = setup({
      selectedElement: { 1: 'edge' }
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
