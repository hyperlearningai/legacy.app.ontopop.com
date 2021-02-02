import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EdgesFilter from '../../components/EdgesFilter'

const setup = () => {
  const props = {
    edgesProperties: [{
      property: 'rdfsLabel',
      value: 'is composed of'
    }],
    updateGraphData: jest.fn(),
    setStoreState: jest.fn(),
  }

  const component = shallow(<EdgesFilter {...props} />)

  return {
    component,
    props
  }
}

describe('EdgesFilter', () => {
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
