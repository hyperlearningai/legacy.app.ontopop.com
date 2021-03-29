import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import View from '../../pages/[view]'

const setup = () => {
  const props = {
    user: {
      isGuest: false,
      email: 'a@b.c',
      token: '123'
    },
    updateStoreValue: jest.fn()
  }
  const component = shallow(<View {...props} />)

  return {
    component
  }
}

describe('View page', () => {
  it('should match snapshot', () => {
    const { component } = setup()
    expect(toJson(component)).toMatchSnapshot()
  })
})
