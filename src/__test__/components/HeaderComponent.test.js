import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import HeaderComponent from '../../components/HeaderComponent'

const setup = ({
  user,
  loading
}) => {
  const props = {
    loading,
    setStoreState: jest.fn(),
    user
  }

  const component = shallow(<HeaderComponent {...props} />)

  return {
    component,
    props
  }
}

describe('HeaderComponent', () => {
  it('should match snapshot when user not logged in and not loading', () => {
    const {
      component
    } = setup({
      user: {
        email: '',
        isGuest: false
      },
      loading: false
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when user logged in and loading', () => {
    const {
      component
    } = setup({
      user: {
        email: 'test@test.com',
        isGuest: false
      },
      loading: true
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
