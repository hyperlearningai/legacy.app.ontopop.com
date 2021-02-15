import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Index from '../../pages/login'

const setup = () => {
  const component = shallow(<Index />)

  return {
    component
  }
}

describe('Login page', () => {
  it('should match snapshot', () => {
    const { component } = setup()
    expect(toJson(component)).toMatchSnapshot()
  })
})
