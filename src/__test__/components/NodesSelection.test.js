import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NodesSelection from '../../components/NodesSelection'
import {
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

const setup = ({
  selectedNode
}) => {
  const props = {
    setStoreState: jest.fn(),
    selectedNode,
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
  }

  const component = shallow(<NodesSelection {...props} />)

  return {
    component,
    props
  }
}

describe('NodesSelection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when no selected node', () => {
    const {
      component
    } = setup({
      selectedNode: undefined
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when selected node', () => {
    const {
      component
    } = setup({
      selectedNode: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY'
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
