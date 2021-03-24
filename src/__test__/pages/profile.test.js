import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Index from '../../pages/index'

const setup = () => {
  const props = {
    updateStoreValue: jest.fn(),
    user: {
      email: 'a@b.c'
    }
  }
  const component = shallow(<Index {...props} />)

  return {
    component
  }
}

describe('Profile page', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { component } = setup()
    expect(toJson(component)).toMatchSnapshot()
  })
})
