import createStore from 'redux-zero'
import { applyMiddleware } from 'redux-zero/middleware'
import loadingMiddleware from 'redux-loading-middleware'
import { DataSet } from 'vis-data'
import { NETWORK_GRAPH_VIEW, SIDEBAR_VIEW_GRAPHS } from '../constants/views'
import { ALGO_TYPE_FULL } from '../constants/algorithms'

const initialState = {
  // common states
  isSidebarOpen: true,
  mainView: NETWORK_GRAPH_VIEW,
  sidebarView: SIDEBAR_VIEW_GRAPHS,
  modal: '',
  loading: false,
  classesFromApi: {},
  objectPropertiesFromApi: {},
  triplesPerNode: {},
  network: undefined,

  isInfoOpen: true,
  isSearchOpen: false,
  isEdgeFilterOpen: false,
  isSettingsOpen: false,
  searchFilter: '',
  edgesToIgnore: [],
  physicsHierarchicalView: false,
  physicsRepulsion: true,
  physicsEdgeLength: 250,
  edgeFilter: '',
  deletedNodes: [],
  isNetworkLoading: false,
  networkLoadingProgress: 0,
  isNodeSelectable: false,
  isEdgeSelectable: false,
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
  exportFileName: 'network-graph',
  freeTextSelection: {},
  filterNodeByPropsData: {},
  filterEdgeByPropsData: {},
  freeTextSelectedElement: '',
  filterNodesByPropSelectedElement: '',
  filterEdgesByPropSelectedElement: '',
  filterNodesByPropElementArray: [],
  filterEdgesByPropElementArray: [],
  isShortestPathNodeSelectable: false,
  shortestPathSelectedNodes: [],
  shortestPathResults: [],
  showContextMenu: false,
  contextMenuData: {
    top: 0,
    left: 0,
    nodeId: ''
  },

  // states to update at every view refresh
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
  selectedNeighbourNode: '',
  isNeighbourNodeSelectable: false,
  highlightedNodes: [],
  isNodeOverlay: false,
  paths: [],

  // view data storage
  lastGraphIndex: 0,
  currentGraph: 'graph-0',
  graphData: {
    'graph-0': {
      label: 'Main',
      noDelete: true,
      type: ALGO_TYPE_FULL
    }
  }
}

const middlewares = applyMiddleware(loadingMiddleware)
const store = createStore(initialState, middlewares)

export default store
