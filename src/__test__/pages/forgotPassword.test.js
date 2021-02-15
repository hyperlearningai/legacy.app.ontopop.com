import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Index from '../../pages/forgotPassword'

const setup = () => {
  const component = shallow(<Index />)

  return {
    component
  }
}

describe('Forgot Password page', () => {
  it('should match snapshot', () => {
    const { component } = setup()
    expect(toJson(component)).toMatchSnapshot()
  })
})
