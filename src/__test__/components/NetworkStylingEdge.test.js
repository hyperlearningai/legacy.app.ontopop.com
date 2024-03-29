import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NetworkStylingEdge from '../../components/NetworkStylingEdge'
import {
  EDGE_COLOR,
  EDGE_COLOR_HIGHLIGHTED,
  LABEL_PROPERTY
} from '../../constants/graph'

const setup = () => {
  const props = {
    updateStoreValue: jest.fn(),
    globalEdgeStyling: {
      stylingEdgeLineColor: EDGE_COLOR,
      stylingEdgeLineColorHover: EDGE_COLOR,
      stylingEdgeLineColorHighlight: EDGE_COLOR_HIGHLIGHTED,
      stylingEdgeLineStyle: false,
      stylingEdgeTextColor: EDGE_COLOR,
      stylingEdgeTextSize: 12,
      stylingEdgeTextAlign: 'horizontal',
      stylingEdgeWidth: 2,
      stylingEdgeLength: 250,
      stylingEdgeCaptionProperty: LABEL_PROPERTY,
    },
    userDefinedEdgeStyling: {
      stylingEdgeLineColor: EDGE_COLOR,
      stylingEdgeLineColorHover: EDGE_COLOR,
      stylingEdgeLineColorHighlight: EDGE_COLOR_HIGHLIGHTED,
      stylingEdgeLineStyle: false,
      stylingEdgeTextColor: EDGE_COLOR,
      stylingEdgeTextSize: 12,
      stylingEdgeTextAlign: 'horizontal',
      stylingEdgeWidth: 2,
      stylingEdgeLength: 250,
      stylingEdgeCaptionProperty: LABEL_PROPERTY,
    },
    stylingEdgeByProperty: [],

  }

  const component = shallow(<NetworkStylingEdge {...props} />)

  return {
    component,
    props
  }
}

describe('NetworkStylingEdge', () => {
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
