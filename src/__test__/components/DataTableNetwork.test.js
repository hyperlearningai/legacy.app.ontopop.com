import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import DataTableNetwork from '../../components/DataTableNetwork'
import {
  EDGE_COLOR,
  EDGE_COLOR_HIGHLIGHTED,
  CLICK_NODE_BACKGROUND,
  HIGHLIGHT_NODE_BORDER,
  HOVER_NODE_BACKGROUND,
  HOVER_NODE_BORDER,
  LABEL_PROPERTY,
  NODE_BACKGROUND,
  NODE_BORDER,
  NODE_DEFAULT_SHAPE,
  NODE_TEXT_COLOR
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
      stylingEdgeWidth: 1,
      stylingEdgeLength: 250,
    },
    userDefinedEdgeStyling: {
      stylingEdgeLineColor: EDGE_COLOR,
      stylingEdgeLineColorHover: EDGE_COLOR,
      stylingEdgeLineColorHighlight: EDGE_COLOR_HIGHLIGHTED,
      stylingEdgeLineStyle: false,
      stylingEdgeTextColor: EDGE_COLOR,
      stylingEdgeTextSize: 12,
      stylingEdgeTextAlign: 'horizontal',
      stylingEdgeWidth: 1,
      stylingEdgeLength: 250,
    },
    globalNodeStyling: {
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
    },
    userDefinedNodeStyling: {
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
    },
    dataTableTriples: [{
      from: '1',
      edge: '12',
      to: '147'
    }, {
      from: '2',
      edge: '21',
      to: '123'
    }],
    dataTableTriplesWithLabels: [{
      fromLabel: 'Road',
      edgeLabel: 'is affected by',
      toLabel: 'Traffic'
    }, {
      fromLabel: 'Traffic',
      edgeLabel: 'found in',
      toLabel: 'Traffic data'
    }]
  }

  const component = shallow(<DataTableNetwork {...props} />)

  return {
    component,
    props
  }
}

describe('DataTableNetwork', () => {
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
