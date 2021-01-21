import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import HeaderComponent from '../../components/HeaderComponent'

const setup = () => {
  const props = {
    loading: true
  }

  const component = shallow(<HeaderComponent {...props} />)

  return {
    component,
    props
  }
}

describe('HeaderComponent', () => {
  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
