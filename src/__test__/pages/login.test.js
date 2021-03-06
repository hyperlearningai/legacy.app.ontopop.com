import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Login from '../../pages/login'

const setup = ({
  activeLoaders
}) => {
  const props = {
    addNumber: jest.fn(),
    addToObject: jest.fn(),
    activeLoaders
  }

  const component = shallow(<Login {...props} />)

  return {
    component
  }
}

describe('Login page', () => {
  it('should match snapshot when activeLoaders', () => {
    const { component } = setup({
      activeLoaders: 1
    })
    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when no activeLoaders', () => {
    const { component } = setup({
      activeLoaders: 0
    })
    expect(toJson(component)).toMatchSnapshot()
  })
})
