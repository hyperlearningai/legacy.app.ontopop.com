import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ShortestPath from '../../components/ShortestPath'

const setup = () => {
  const props = {
    shortestPathNode1: 'http://webprotege.stanford.edu/R7Ae7UPY2C3UrcNeeLv0gYV',
    shortestPathNode2: 'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9',
    isShortestPathNode1Selectable: false,
    isShortestPathNode2Selectable: true,
    updateStoreValue: jest.fn(),
  }

  const component = shallow(<ShortestPath {...props} />)

  return {
    component,
    props
  }
}

describe('ShortestPath', () => {
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
