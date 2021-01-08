import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Sidebar from '../../components/Sidebar'

const setup = () => {
  const props = {
    isSidebarOpen: true,
    setStoreState: jest.fn(),
  }

  const component = shallow(<Sidebar {...props} />)

  return {
    component,
    props
  }
}

describe('Sidebar', () => {
  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
