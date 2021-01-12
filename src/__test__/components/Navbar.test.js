import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Navbar from '../../components/Navbar'
import {
  NETWORK_GRAPH_VIEW
} from '../../constants/views'

const setup = () => {
  const props = {
    setStoreState: jest.fn(),
    mainView: NETWORK_GRAPH_VIEW,
    availableNodes: [{ id: '123' }],
    isNodeSelectable: true,
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
