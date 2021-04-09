import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AuthCheck from '../../components/AuthCheck'

const setup = () => {
  const props = {
    updateStoreValue: jest.fn(),
    user: {
      email: 'valid@email.coma'
    },
    pageProps: {}
  }

  const component = shallow(<AuthCheck {...props} />)

  return {
    component,
    props
  }
}

describe('AuthCheck', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const {
      component
    } = setup({
      isAuthCheckInternal: false
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
