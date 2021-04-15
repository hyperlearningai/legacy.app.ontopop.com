import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import App from '../../pages/app'

const setup = () => {
  const props = {
    user: {
      isGuest: false,
      email: 'a@b.c',
      token: '123'
    },
  }
  const component = shallow(<App {...props} />)

  return {
    component
  }
}

describe('App page', () => {
  it('should match snapshot', () => {
    const { component } = setup()
    expect(toJson(component)).toMatchSnapshot()
  })
})
