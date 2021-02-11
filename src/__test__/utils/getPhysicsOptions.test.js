import store from '../../store'
import getPhysicsOptions from '../../utils/getPhysicsOptions'
import {
  EDGE_COLOR,
  EDGE_COLOR_HIGHLIGHTED,
  NODE_TEXT_COLOR,
  NODE_BORDER,
  NODE_BACKGROUND,
  CLICK_NODE_BACKGROUND,
  HIGHLIGHT_NODE_BORDER,
  NODE_DEFAULT_SHAPE,
  HOVER_NODE_BORDER,
  HOVER_NODE_BACKGROUND
} from '../../constants/graph'

describe('getPhysicsOptions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no physics', () => {
    const physicsHierarchicalView = true
    const physicsRepulsion = false
    const isPhysicsOn = false
    const stylingEdgeLength = 10
    const stylingEdgeLineColor = EDGE_COLOR
    const stylingEdgeLineColorHover = EDGE_COLOR
    const stylingEdgeLineColorHighlight = EDGE_COLOR_HIGHLIGHTED
    const stylingEdgeLineStyle = false
    const stylingEdgeWidth = 2
    const stylingNodeSize = 25
    const stylingNodeBorder = 1
    const stylingNodeTextColor = NODE_TEXT_COLOR
    const stylingNodeBorderSelected = 2
    const stylingNodeBorderColor = NODE_BORDER
    const stylingNodeBackgroundColor = NODE_BACKGROUND
    const stylingNodeHighlightBorderColor = HIGHLIGHT_NODE_BORDER
    const stylingNodeHighlightBackgroundColor = CLICK_NODE_BACKGROUND
    const stylingNodeHoverBackgroundColor = HOVER_NODE_BACKGROUND
    const stylingNodeHoverBorderColor = HOVER_NODE_BORDER
    const stylingNodeShape = NODE_DEFAULT_SHAPE
    const stylingNodeTextFontSize = 12
    const stylingNodeTextFontAlign = 'center'
    const stylingEdgeTextColor = EDGE_COLOR
    const stylingEdgeTextSize =12
    const stylingEdgeTextAlign ='horizontal'

    const getState = jest.fn().mockImplementation(() => ({
      isPhysicsOn,
      physicsHierarchicalView,
      physicsRepulsion,
      stylingEdgeLength,
      stylingEdgeWidth,
      stylingEdgeLineStyle,
      stylingEdgeLineColor,
      stylingEdgeLineColorHover,
      stylingEdgeLineColorHighlight,
      stylingNodeShape,
      stylingNodeSize,
      stylingNodeBorder,
      stylingNodeBorderSelected,
      stylingNodeBorderColor,
      stylingNodeBackgroundColor,
      stylingNodeTextColor,
      stylingNodeHighlightBorderColor,
      stylingNodeHighlightBackgroundColor,
      stylingNodeHoverBackgroundColor,
      stylingNodeHoverBorderColor,
      stylingNodeTextFontSize,
      stylingNodeTextFontAlign,
      stylingEdgeTextColor,
      stylingEdgeTextSize,
      stylingEdgeTextAlign,
    }))

    store.getState  = getState


    expect(getPhysicsOptions()).toEqual({
      "autoResize": true,
      "edges":{
        "arrows":{
          "to": true,
        },
        "color":{
          "color": "#070b11",
          "highlight": "#9c27b0",
          "hover": "#070b11",
          "inherit": "from",
          "opacity": 1,
        },
        "dashes": false,
        "font":  {
          "align": "horizontal",
          "color": "#070b11",
          "size": 12,
        },    
        "labelHighlightBold": true,
        "selectionWidth": 3,
        "smooth":{
          "forceDirection": "none",
          "roundness": 0.45,
          "type": "cubicBezier",
        },
        "width": 2,
     },
     "interaction":{
       "hideEdgesOnDrag": true,
       "hover": true,
       "keyboard": true,
       "navigationButtons": true,
     },
     "layout":{
       "hierarchical":{
         "enabled": true,
         "levelSeparation": 5,
         "nodeSpacing": 10,
         "sortMethod": "hubsize",
         "treeSpacing": 115,
       },
       "improvedLayout": false,
       "randomSeed": 333,
     },
     "nodes":{
       "borderWidth": 1,
       "borderWidthSelected": 2,
       "color":{
         "background": "#adefd1",
         "border": "#011e41",
         "highlight":{
           "background": "#abd6df",
           "border": "#009688",
         },
         "hover":{
           "background": "#f2f2f2",
           "border": "#607d8b",
         },
       },
       "font":{
          "align": "center",
          "bold": "700",
          "color": "#000000",
          "face": "Montserrat",
          "size": 12,
       },
       "shape": "circle",
       "size": 25,
     },
     "physics": false,
    })
  })
})
