import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NetworkSettings from '../../components/NetworkSettings'

const setup = () => {
  const props = {
    setStoreState: jest.fn(),
    physicsEdgeLength: 100,
    physicsRepulsion: true,
    physicsHierarchicalView: true,
    isPhysicsOn: true,
  }

  const component = shallow(<NetworkSettings {...props} />)

  return {
    component,
    props
  }
}

describe('NetworkSettings', () => {
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
