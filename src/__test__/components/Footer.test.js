import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Footer from '../../components/Footer'

const setup = () => {
  const props = {
    updateStoreValue: jest.fn()
  }

  const component = shallow(<Footer {...props} />)

  return {
    component,
    props
  }
}

describe('Footer', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
