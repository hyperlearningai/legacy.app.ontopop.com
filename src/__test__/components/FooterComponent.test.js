import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import FooterComponent from '../../components/FooterComponent'

const setup = () => {
  const props = {
    setStoreState: jest.fn(),
    isSettingsOpen: true,
    availableEdges: [{ id: '123' }]
  }

  const component = shallow(<FooterComponent {...props} />)

  return {
    component,
    props
  }
}

describe('FooterComponent', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
