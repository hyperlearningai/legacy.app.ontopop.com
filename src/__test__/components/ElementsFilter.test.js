import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ElementsFilter from '../../components/ElementsFilter'

const setup = () => {
  const props = {
    annotationProperties: [{
      property: 'rdfsLabel',
      value: 'road'
    }],
    updateStoreValue: jest.fn(),
  }

  const component = shallow(<ElementsFilter {...props} />)

  return {
    component,
    props
  }
}

describe('ElementsFilter', () => {
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
