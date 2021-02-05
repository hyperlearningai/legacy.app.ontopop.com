import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Navbar from '../../components/Navbar'

const setup = () => {
  const props = {
    availableEdgesNormalised: { 123: { id: '123' } },
    availableNodesNormalised: { 123: { id: '123' } },
    selectedGraphVersion: 'original'
  }

  const component = shallow(<Navbar {...props} />)

  return {
    component,
    props
  }
}

describe('Navbar', () => {
  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
