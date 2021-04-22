import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import CookieBar from '../../components/CookieBar'

const setup = ({ isCookieBarOpen }) => {
  const props = {
    isCookieBarOpen,
    isAnalyticsCookie: true,
    isPreferencesCookie: true,
    updateStoreValue: jest.fn(),
  }

  const component = shallow(<CookieBar {...props} />)

  return {
    component,
    props
  }
}

describe('CookieBar', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when isCookieBarOpen is false', () => {
    const {
      component
    } = setup({
      isCookieBarOpen: false
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when isCookieBarOpen ', () => {
    const {
      component
    } = setup({
      isCookieBarOpen: true
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
