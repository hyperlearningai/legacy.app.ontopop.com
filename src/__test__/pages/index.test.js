import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Index from '../../pages'

const setup = () => {
  const props = {
    user: {
      isGuest: false,
      email: 'a@b.c',
      token: '123'
    },
  }
  const component = shallow(<Index {...props} />)

  return {
    component
  }
}

describe('Index page', () => {
  it('should match snapshot', () => {
    const { component } = setup()
    expect(toJson(component)).toMatchSnapshot()
  })
})
