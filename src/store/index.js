import createStore from 'redux-zero'
import { applyMiddleware } from 'redux-zero/middleware'
import loadingMiddleware from 'redux-loading-middleware'
import { NETWORK_GRAPH_VIEW, SIDEBAR_VIEW_GRAPHS } from '../constants/views'

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

  // states to update at every view refresh
  nodesIdsToDisplay: [],

  availableNodes: [],
  availableNodesNormalised: {},
  availableEdges: [],
  selectedNodes: [],
  selectedEdges: [],
  nodesConnections: {},
  edgesConnections: {},

  // view data storage
  lastGraphIndex: 0,
  currentGraph: 'graph-0',
  graphData: {
    'graph-0': {
      label: 'Main',
      noDelete: true,
    }
  }
}

const middlewares = applyMiddleware(loadingMiddleware)
const store = createStore(initialState, middlewares)

export default store
