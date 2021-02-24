import createStore from 'redux-zero'
import { applyMiddleware } from 'redux-zero/middleware'
import loadingMiddleware from 'redux-loading-middleware'
import { DataSet } from 'vis-data'
import { SIDEBAR_VIEW_GRAPHS } from '../constants/views'
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
  sidebarView: SIDEBAR_VIEW_GRAPHS,
  loading: false,

  // user
  user: {
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    isGuest: false
  },

  // data loaded at startup
  classesFromApi: {},
  objectPropertiesFromApi: {},
  classesFromApiBackup: {},
  objectPropertiesFromApiBackup: {},
  triplesPerNode: {},
  triplesPerNodeBackup: {},
  network: undefined,
  annotationProperties: [],
  deletedNodes: [],
  addedNodes: [],
  updatedNodes: [],
  deletedEdges: [],
  addedEdges: [],
  updatedEdges: [],
  deletedConnections: [],
  addedConnections: [],
  availableNodesCount: 0,
  availableEdgesCount: 0,

  // Data visualisation
  nodesIdsToDisplay: [],
  edgesIdsToDisplay: [],
  availableNodes: new DataSet([]),
  availableEdges: new DataSet([]),
  nodesConnections: {},
  edgesConnections: {},
  highlightedNodes: [],

  // network styling
  stylingEdgeLineColor: EDGE_COLOR,
  stylingEdgeLineColorHover: EDGE_COLOR,
  stylingEdgeLineColorHighlight: EDGE_COLOR_HIGHLIGHTED,
  stylingEdgeLineStyle: false,
  stylingEdgeTextColor: EDGE_COLOR,
  stylingEdgeTextSize: 12,
  stylingEdgeTextAlign: 'horizontal',
  stylingEdgeWidth: 1,
  stylingEdgeByProperty: [
    JSON.parse(JSON.stringify(SUBCLASS_EDGE_STYLING_DEFAULT_OBJECT)),
    JSON.parse(JSON.stringify(NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT))
  ],
  stylingEdgeLength: 250,
  stylingEdgeCaptionProperty: EDGE_LABEL_PROPERTY,

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
  stylingNodeOverlayOpacity: 0.1,

  // netowrk graph loading
  isNetworkLoading: false,
  networkLoadingProgress: 0,

  // free text selection
  searchFilter: '',
  freeTextSelection: {},
  freeTextSelectedElement: '',
  freeTextPrevSelectedElement: undefined,

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

const middlewares = applyMiddleware(loadingMiddleware)
const store = createStore(initialState, middlewares)

export default store
