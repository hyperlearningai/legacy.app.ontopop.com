import startupActions from '../../../utils/graphVisualisation/startupActions'
import getGraphData from '../../../utils/apiCalls/getGraphData'
import loadStyling from '../../../utils/networkStyling/loadStyling'
import setNodesIdsToDisplay from '../../../utils/graphVisualisation/setNodesIdsToDisplay'
import notesGetNotes from '../../../utils/notes/notesGetNotes'
import store from '../../../store'
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
} from '../../../constants/graph'

jest.mock('../../../utils/networkStyling/loadStyling')
jest.mock('../../../utils/apiCalls/getGraphData')
jest.mock('../../../utils/graphVisualisation/setNodesIdsToDisplay')
jest.mock('../../../utils/notes/notesGetNotes')

const updateStoreValue = jest.fn()
const t = jest.fn()

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
const stylingEdgeTextSize = 12
const stylingEdgeTextAlign = 'horizontal'

describe('startupActions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when isGuest', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      user: { isGuest: true }
    }))

    Storage.prototype.getItem = () => JSON.stringify({
      globalNodeStyling: {
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
      },
      globalEdgeStyling: {
        stylingEdgeLength,
        stylingEdgeWidth,
        stylingEdgeLineStyle,
        stylingEdgeLineColor,
        stylingEdgeLineColorHover,
        stylingEdgeLineColorHighlight,
        stylingEdgeTextColor,
        stylingEdgeTextSize,
        stylingEdgeTextAlign,
      },
    })

    await startupActions({
      updateStoreValue,
      t
    })

    expect(loadStyling).toHaveBeenCalledTimes(0)
    expect(notesGetNotes).toHaveBeenCalledTimes(0)
    expect(updateStoreValue.mock.calls).toEqual(
      [[['globalNodeStyling'], 'update', {
        stylingNodeBackgroundColor: '#adefd1',
        stylingNodeBorder: 1,
        stylingNodeBorderColor: '#011e41',
        stylingNodeBorderSelected: 2,
        stylingNodeHighlightBackgroundColor: '#ffed00',
        stylingNodeHighlightBorderColor: '#009688',
        stylingNodeHoverBackgroundColor: '#f2f2f2',
        stylingNodeHoverBorderColor: '#607d8b',
        stylingNodeShape: 'circle',
        stylingNodeSize: 25,
        stylingNodeTextColor: '#000000',
        stylingNodeTextFontAlign: 'center',
        stylingNodeTextFontSize: 12
      }], [['globalEdgeStyling'], 'update', {
        stylingEdgeLength: 10,
        stylingEdgeLineColor: '#070b11',
        stylingEdgeLineColorHighlight: '#9c27b0',
        stylingEdgeLineColorHover: '#070b11',
        stylingEdgeLineStyle: false,
        stylingEdgeTextAlign: 'horizontal',
        stylingEdgeTextColor: '#070b11',
        stylingEdgeTextSize: 12,
        stylingEdgeWidth: 2
      }], [['showTour'], 'update', {
        globalEdgeStyling: {
          stylingEdgeLength: 10,
          stylingEdgeLineColor: '#070b11',
          stylingEdgeLineColorHighlight: '#9c27b0',
          stylingEdgeLineColorHover: '#070b11',
          stylingEdgeLineStyle: false,
          stylingEdgeTextAlign: 'horizontal',
          stylingEdgeTextColor: '#070b11',
          stylingEdgeTextSize: 12,
          stylingEdgeWidth: 2
        },
        globalNodeStyling: {
          stylingNodeBackgroundColor: '#adefd1',
          stylingNodeBorder: 1,
          stylingNodeBorderColor: '#011e41',
          stylingNodeBorderSelected: 2,
          stylingNodeHighlightBackgroundColor: '#ffed00',
          stylingNodeHighlightBorderColor: '#009688',
          stylingNodeHoverBackgroundColor: '#f2f2f2',
          stylingNodeHoverBorderColor: '#607d8b',
          stylingNodeShape: 'circle',
          stylingNodeSize: 25,
          stylingNodeTextColor: '#000000',
          stylingNodeTextFontAlign: 'center',
          stylingNodeTextFontSize: 12
        }
      }]]
    )

    expect(getGraphData).toHaveBeenCalledWith({
      updateStoreValue,
      t
    })

    expect(setNodesIdsToDisplay).toHaveBeenCalledWith({
      updateStoreValue,
      t
    })
  })

  it('should work correctly', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      user: { isGuest: false }
    }))

    await startupActions({
      updateStoreValue,
      t
    })

    expect(loadStyling).toHaveBeenCalledWith({
      updateStoreValue,
      t
    })

    expect(getGraphData).toHaveBeenCalledWith({
      updateStoreValue,
      t
    })

    expect(notesGetNotes.mock.calls).toEqual([
      [
        {
          updateStoreValue,
          t
        }
      ],
      [
        {
          updateStoreValue,
          type: 'node',
          t
        }
      ],
      [
        {
          updateStoreValue,
          type: 'edge',
          t
        }
      ],
    ])

    expect(setNodesIdsToDisplay).toHaveBeenCalledWith({
      updateStoreValue,
      t
    })
  })
})
