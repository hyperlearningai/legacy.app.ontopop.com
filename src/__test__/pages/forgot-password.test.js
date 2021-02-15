import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ForgotPassword from '../../pages/forgot-password'

const setup = ({
  loading
}) => {
  const props = {
    setStoreState: jest.fn(),
    addToObject: jest.fn(),
    loading
  }

  const component = shallow(<ForgotPassword {...props} />)

  return {
    component
  }
}

describe('Forgot Password page', () => {
  it('should match snapshot when loading', () => {
    const { component } = setup({
      loading: true
    })
    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when not loading', () => {
    const { component } = setup({
      loading: false
    })
    expect(toJson(component)).toMatchSnapshot()
  })
})
