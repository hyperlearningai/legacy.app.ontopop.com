import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NetworkStylingNodeByPropertyForm from '../../components/NetworkStylingNodeByPropertyForm'
import { NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT } from '../../constants/graph'

const setup = () => {
  const props = {
    setStoreState: jest.fn(),
    index: 0,
    stylingProperty: JSON.parse(JSON.stringify(NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT)),
    isDeleteAvailable: true,
    annotationProperties: [{
      property: 'rdfsLabel',
      value: 'rdfsLabel'
    }],
  }

  const component = shallow(<NetworkStylingNodeByPropertyForm {...props} />)

  return {
    component,
    props
  }
}

describe('NetworkStylingNodeByPropertyForm', () => {
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
