import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ShortestPath from '../../components/ShortestPath'
import { OwlClasses } from '../fixtures/test-ontology-classes.json'

const setup = () => {
  const props = {
    classesFromApi: OwlClasses,
    removeFromArray: jest.fn(),
    setStoreState: jest.fn(),
    shortestPathSelectedNodes: [
      'http://webprotege.stanford.edu/R7Ae7UPY2C3UrcNeeLv0gYV',
      'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9'
    ],
    updateGraphData: jest.fn(),
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
