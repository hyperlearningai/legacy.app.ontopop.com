import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NodesFilter from '../../components/NodesFilter'

const setup = () => {
  const props = {
    annotationProperties: [{
      property: 'rdfsLabel',
      value: 'road'
    }],
    updateStoreValue: jest.fn(),
  }

  const component = shallow(<NodesFilter {...props} />)

  return {
    component,
    props
  }
}

describe('NodesFilter', () => {
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
