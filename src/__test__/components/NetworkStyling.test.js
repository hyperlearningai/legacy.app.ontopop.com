import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NetworkStyling from '../../components/NetworkStyling'

const setup = () => {
  const props = {}

  const component = shallow(<NetworkStyling {...props} />)

  return {
    component,
    props
  }
}

describe('NetworkStyling', () => {
  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
