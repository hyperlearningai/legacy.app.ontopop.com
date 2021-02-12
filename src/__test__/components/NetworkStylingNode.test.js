import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NetworkStylingNode from '../../components/NetworkStylingNode'
import {
  CLICK_NODE_BACKGROUND,
  HIGHLIGHT_NODE_BORDER,
  HOVER_NODE_BACKGROUND,
  HOVER_NODE_BORDER,
  LABEL_PROPERTY,
  NODE_BACKGROUND,
  NODE_BORDER,
  NODE_DEFAULT_SHAPE,
  NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT,
  NODE_TEXT_COLOR
} from '../../constants/graph'

const setup = () => {
  const props = {
    setStoreState: jest.fn(),
    stylingNodeSize: 25,
    stylingNodeBorder: 1,
    stylingNodeTextColor: NODE_TEXT_COLOR,
    stylingNodeBorderSelected: 2,
    stylingNodeBorderColor: NODE_BORDER,
    stylingNodeBackgroundColor: NODE_BACKGROUND,
    stylingNodeHighlightBorderColor: HIGHLIGHT_NODE_BORDER,
    stylingNodeHighlightBackgroundColor: CLICK_NODE_BACKGROUND,
    stylingNodeHoverBackgroundColor: HOVER_NODE_BACKGROUND,
    stylingNodeHoverBorderColor: HOVER_NODE_BORDER,
    stylingNodeShape: NODE_DEFAULT_SHAPE,
    stylingNodeTextFontSize: 12,
    stylingNodeTextFontAlign: 'center',
    stylingNodeCaptionProperty: LABEL_PROPERTY,
    stylingNodeByProperty: [
      JSON.parse(JSON.stringify(NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT))
    ],
    annotationProperties: [{
      property: 'rdfsLabel',
      value: 'rdfsLabel'
    }],
  }

  const component = shallow(<NetworkStylingNode {...props} />)

  return {
    component,
    props
  }
}

describe('NetworkStylingNode', () => {
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
