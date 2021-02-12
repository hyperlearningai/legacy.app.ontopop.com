import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NetworkStylingEdgeByPropertyForm from '../../components/NetworkStylingEdgeByPropertyForm'
import { SUBCLASS_EDGE_STYLING_DEFAULT_OBJECT } from '../../constants/graph'

const setup = () => {
  const props = {
    setStoreState: jest.fn(),
    index: 0,
    stylingProperty: JSON.parse(JSON.stringify(SUBCLASS_EDGE_STYLING_DEFAULT_OBJECT)),
    isDeleteAvailable: true,
    annotationProperties: [{
      property: 'rdfsLabel',
      value: 'rdfsLabel'
    }],
  }

  const component = shallow(<NetworkStylingEdgeByPropertyForm {...props} />)

  return {
    component,
    props
  }
}

describe('NetworkStylingEdgeByPropertyForm', () => {
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
