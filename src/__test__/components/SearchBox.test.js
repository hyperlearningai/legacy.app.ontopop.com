import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NodeInfo from '../../components/NodeInfo'

const setup = () => {
  const props = {
    searchFilter: 'abc',
    setStoreState: jest.fn()
  }

  const component = shallow(<NodeInfo {...props} />)

  return {
    component,
    props
  }
}

describe('NodeInfo', () => {
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
