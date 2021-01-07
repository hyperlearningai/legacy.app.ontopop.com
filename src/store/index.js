import createStore from 'redux-zero'
import { applyMiddleware } from 'redux-zero/middleware'
import loadingMiddleware from 'redux-loading-middleware'
import { NETWORK_GRAPH_VIEW, SIDEBAR_VIEW_NODES } from '../constants/views'

const initialState = {
  isSidebarOpen: false,
  mainView: NETWORK_GRAPH_VIEW,
  sidebarView: SIDEBAR_VIEW_NODES,
  modal: '',
  loading: false,
  classesFromApi: {},
  objectPropertiesFromApi: {},
  availableNodes: [],
  availableNodesNormalised: {},
  availableEdges: [],
  nodesIdsToDisplay: [],
  selectedNode: undefined,
  isInfoOpen: true,
  isSearchOpen: false,
  isEdgeFilterOpen: false,
  isSettingsOpen: false,
  searchFilter: '',
  edgesToIgnore: [],
  physicsHierarchicalView: false,
  physicsRepulsion: true,
  physicsEdgeLength: 300,
  edgeFilter: '',
  fitNetwork: false
}

const middlewares = applyMiddleware(loadingMiddleware)
const store = createStore(initialState, middlewares)

export default store
