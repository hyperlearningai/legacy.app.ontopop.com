import createStore from 'redux-zero'
import { DataSet } from 'vis-data'
import { MAIN_VIEW_SEARCH, SIDEBAR_VIEW_ENTRY_SEARCH } from '../constants/views'
import { ALGO_TYPE_FULL } from '../constants/algorithms'
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
  HOVER_NODE_BACKGROUND,
  LABEL_PROPERTY,
  NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT,
  SUBCLASS_EDGE_STYLING_DEFAULT_OBJECT,
  EDGE_LABEL_PROPERTY
} from '../constants/graph'

const initialState = {
  // view updates
  isSidebarOpen: true,
  sidebarView: SIDEBAR_VIEW_ENTRY_SEARCH,
  activeLoaders: 0,
  mainVisualisation: MAIN_VIEW_SEARCH,

  // user
  user: {
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    isGuest: false,
    token: ''
  },

  // data loaded at startup
  classesFromApi: {},
  objectPropertiesFromApi: {},
  classesFromApiBackup: {},
  objectPropertiesFromApiBackup: {},
  edgesPerNode: {},
  edgesPerNodeBackup: {},
  network: undefined,
  annotationProperties: [],
  deletedNodes: [],
  addedNodes: [],
  updatedNodes: [],
  deletedEdges: [],
  addedEdges: [],
  availableNodesCount: 0,
  availableEdgesCount: 0,

  // Data visualisation
  nodesIdsToDisplay: [],
  availableNodes: new DataSet([]),
  availableEdges: new DataSet([]),
  nodesEdges: {},
  highlightedNodes: [],
  highlightedEdges: [],

  // network styling
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
    stylingEdgeCaptionProperty: EDGE_LABEL_PROPERTY,
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
    stylingEdgeCaptionProperty: EDGE_LABEL_PROPERTY,
  },

  stylingEdgeByProperty: [
    JSON.parse(JSON.stringify(SUBCLASS_EDGE_STYLING_DEFAULT_OBJECT)),
    JSON.parse(JSON.stringify(NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT))
  ],

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
    stylingNodeOverlayOpacity: 0.1,
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
    stylingNodeOverlayOpacity: 0.1,
  },

  stylingNodeByProperty: [
    JSON.parse(JSON.stringify(NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT))
  ],

  // entry search
  entrySearchFilter: 'all',
  entrySearchResults: [],
  entrySearchAnnotationProperties: [],
  isQueried: false,

  // free text search
  freeTextSelection: {},
  freeTextSelectedElement: '',
  freeTextPrevSelectedElement: undefined,

  // Structured search
  structuredSelection: {},
  structuredSelectedElement: '',
  structuredPrevSelectedElement: undefined,

  // node selection
  isNodeSelectable: false,
  selectedNode: '',
  prevSelectedNode: undefined,

  // edge selection
  isEdgeSelectable: false,
  selectedEdge: '',
  prevSelectedEdges: undefined,

  // bounding box
  selectedBoundingBoxNodes: [],
  isBoundingBoxSelectable: false,
  isBoundingBoxDrawable: false,
  boundingBoxGeometry: {
    fixedPointX: 0,
    fixedPointY: 0,
    boundingBoxPosX: 0,
    boundingBoxPosY: 0,
    boundingBoxWidth: 0,
    boundingBoxHeight: 0,
  },
  isBoundingBoxSelectionInternal: true,

  // file export
  exportFileName: 'network-graph',

  // node neighbourhood
  selectedNeighbourNode: '',
  isNeighbourNodeSelectable: false,

  // shortest path
  isShortestPathNode1Selectable: false,
  isShortestPathNode2Selectable: false,
  shortestPathNode1Object: undefined,
  shortestPathNode1: '',
  shortestPathNode2Object: undefined,
  shortestPathNode2: '',
  shortestPathResults: [],
  isNodeOverlay: false,
  shortestPathNodes: [],

  // context menu
  showContextMenu: false,
  contextMenuData: {
    top: 0,
    left: 0,
    nodeId: ''
  },

  // physics
  isPhysicsOn: false,
  physicsHierarchicalView: false,
  physicsRepulsion: true,

  // custom query
  customQueryOutput: undefined,
  customQueryFromLatestOutput: '',
  customQueryStringHistory: [
    'g.V().hasLabel(\'class\').count()',
    'g.V().has(\'id\', 48).bothE().otherV().path().unfold().dedup().valueMap()',
  ],

  // graphs data storage
  lastGraphIndex: 0,
  currentGraph: 'graph-0',
  graphData: {
    'graph-0': {
      label: 'Main',
      noDelete: true,
      type: ALGO_TYPE_FULL,
    }
  }
}

const store = createStore(initialState)

export default store
