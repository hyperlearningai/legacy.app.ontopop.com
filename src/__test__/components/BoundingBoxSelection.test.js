import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import BoundingBoxSelection from '../../components/BoundingBoxSelection'

const setup = ({
  isBoundingBoxSelectionInternal
}) => {
  const props = {
    updateStoreValue: jest.fn(),
    selectedBoundingBoxNodes: [],
    isBoundingBoxSelectionInternal
  }

  const component = shallow(<BoundingBoxSelection {...props} />)

  return {
    component,
    props
  }
}

describe('BoundingBoxSelection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when isBoundingBoxSelectionInternal', () => {
    const {
      component
    } = setup({
      isBoundingBoxSelectionInternal: true
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when isBoundingBoxSelectionInternal is false', () => {
    const {
      component
    } = setup({
      isBoundingBoxSelectionInternal: false
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
