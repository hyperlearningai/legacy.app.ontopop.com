import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import BoundingBoxSelection from '../../components/BoundingBoxSelection'

const setup = () => {
  const props = {
    setStoreState: jest.fn(),
    selectedBoundingBoxNodes: [],
    updateGraphData: jest.fn(),
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

  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
