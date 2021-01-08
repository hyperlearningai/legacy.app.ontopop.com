import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SettingsBox from '../../components/SettingsBox'

const setup = () => {
  const props = {
    setStoreState: jest.fn(),
    physicsEdgeLength: 10,
    physicsRepulsion: true,
    physicsHierarchicalView: true,
  }

  const component = shallow(<SettingsBox {...props} />)

  return {
    component,
    props
  }
}

describe('SettingsBox', () => {
  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
