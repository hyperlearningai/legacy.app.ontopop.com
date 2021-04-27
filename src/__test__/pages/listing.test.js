import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Listing from '../../pages/listing'

const setup = () => {
  const props = {
    user: {
      isGuest: false,
      email: 'a@b.c',
      token: '123'
    },
  }
  const component = shallow(<Listing {...props} />)

  return {
    component
  }
}

describe('Listing page', () => {
  it('should match snapshot', () => {
    const { component } = setup()
    expect(toJson(component)).toMatchSnapshot()
  })
})
