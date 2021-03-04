import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import MainArea from '../../components/MainArea'

const setup = () => {
  const props = {
    setStoreState: jest.fn(),
    entrySearchFilter: 'all',
    annotationProperties: [{
      value: 'rdfAbout',
      label: 'rdfAbout'
    }],
    entrySearchAnnotationProperties: ['rdfAbout']
  }

  const component = shallow(<MainArea {...props} />)

  return {
    component,
    props
  }
}

describe('MainArea', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
