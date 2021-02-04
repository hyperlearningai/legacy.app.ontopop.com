import createStore from 'redux-zero'
import { applyMiddleware } from 'redux-zero/middleware'
import loadingMiddleware from 'redux-loading-middleware'
import { DataSet } from 'vis-data'
import { SIDEBAR_VIEW_GRAPHS } from '../constants/views'
import { ALGO_TYPE_FULL } from '../constants/algorithms'

const initialState = {
  // view updates
  isSidebarOpen: true,
  sidebarView: SIDEBAR_VIEW_GRAPHS,
  loading: false,

  // data loaded at startup
  classesFromApi: {},
  objectPropertiesFromApi: {},
  triplesPerNode: {},
  network: undefined,
  nodesProperties: [],
  edgesProperties: [],
  deletedNodes: [],
  addedNodes: [],
  updatedNodes: [],

  // netowrk graph loading
  isNetworkLoading: false,
  networkLoadingProgress: 0,

  // free text selection
  searchFilter: '',
  freeTextSelection: {},
  freeTextSelectedElement: '',

  // node/edge selection
  isNodeSelectable: false,
  isEdgeSelectable: false,

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
  isShortestPathNodeSelectable: false,
  shortestPathSelectedNodes: [],
  shortestPathResults: [],
  isNodeOverlay: false,

  // context menu
  showContextMenu: false,
  contextMenuData: {
    top: 0,
    left: 0,
    nodeId: ''
  },

  // states to update at every view refresh
  // physics
  isPhysicsOn: false,
  physicsHierarchicalView: false,
  physicsRepulsion: true,
  physicsEdgeLength: 250,

  // Data visualisation
  nodesIdsToDisplay: [],
  edgesIdsToDisplay: [],
  availableNodes: new DataSet([]),
  availableNodesNormalised: {},
  availableEdges: new DataSet([]),
  availableEdgesNormalised: {},
  selectedNodes: [],
  selectedEdges: [],
  nodesConnections: {},
  edgesConnections: {},
  highlightedNodes: [],

  // custom query
  customQueryOutput: undefined,
  customQueryFromLatestOutput: '',
  customQueryStringHistory: [
    'g.V().hasLabel(\'class\').count()',
    'g.V().has(\'id\', 48).bothE().otherV().path().unfold().dedup().valueMap()',
  ],

  // new graph version
  selectedGraphVersion: 'original',
  isOntologyUpdated: false,
  graphVersions: {
    original: {
      classesFromApi: {},
      objectPropertiesFromApi: {},
      classesFromApiBackup: {},
      objectPropertiesFromApiBackup: {},
      deletedNodes: [],
      addedNodes: [],
      updatedNodes: []
    },
  },

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
