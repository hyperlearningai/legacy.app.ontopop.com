import { DataSet } from 'vis-data'
import { NETWORK_VIEW_GRAPH, SIDEBAR_VIEW_ENTRY_SEARCH } from '../constants/views'
import { ALGO_TYPE_FULL } from '../constants/algorithms'
import {
  EDGE_COLOR,
  EDGE_COLOR_HIGHLIGHTED,
  NODE_TEXT_COLOR,
  NODE_BORDER,
  NODE_BACKGROUND,
  NODE_BACKGROUND_DATASET,
  CLICK_NODE_BACKGROUND,
  HIGHLIGHT_NODE_BORDER,
  NODE_DEFAULT_SHAPE,
  HOVER_NODE_BORDER,
  HOVER_NODE_BACKGROUND,
  LABEL_PROPERTY,
  NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT,
  SUBCLASS_EDGE_STYLING_DEFAULT_OBJECT,
  EDGE_LABEL_PROPERTY,
  LABEL_PROPERTY_DATASET,
  DEFAULT_GRAPH_VISUALISATION_OPTIONS
} from '../constants/graph'
import { ADVANCED_SEARCH_TEMPLATE } from '../constants/search'

const initialState = {
  showTour: {
    search: 'true',
    searchResults: 'true',
    navigate: 'true',
    datatable: 'true',
    elementSelection: 'true',
    graphOptions: 'true',
    notes: 'true',
    synonyms: 'true',
    editOntology: 'true',
    export: 'true'
  },

  // view updates
  isSidebarOpen: true,
  sidebarView: SIDEBAR_VIEW_ENTRY_SEARCH,
  activeLoaders: 0,
  networkVisualisation: NETWORK_VIEW_GRAPH,

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
  totalEdgesPerNode: {},
  totalEdgesPerNodeBackup: {},
  nodesSpiderability: {},
  network: undefined,
  annotationProperties: [],
  annotationPropertiesDatasets: [],
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
  dataTableTriples: [],
  dataTableTriplesWithLabels: [],

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
    stylingNodeBackgroundColorDataset: NODE_BACKGROUND_DATASET,
    stylingNodeHighlightBorderColor: HIGHLIGHT_NODE_BORDER,
    stylingNodeHighlightBackgroundColor: CLICK_NODE_BACKGROUND,
    stylingNodeHoverBackgroundColor: HOVER_NODE_BACKGROUND,
    stylingNodeHoverBorderColor: HOVER_NODE_BORDER,
    stylingNodeShape: NODE_DEFAULT_SHAPE,
    stylingNodeTextFontSize: 12,
    stylingNodeTextFontAlign: 'center',
    stylingNodeCaptionProperty: LABEL_PROPERTY,
    stylingNodeCaptionPropertyDataset: LABEL_PROPERTY_DATASET,
    stylingNodeOverlayOpacity: 0.1,
  },

  userDefinedNodeStyling: {
    stylingNodeSize: 25,
    stylingNodeBorder: 1,
    stylingNodeTextColor: NODE_TEXT_COLOR,
    stylingNodeBorderSelected: 2,
    stylingNodeBorderColor: NODE_BORDER,
    stylingNodeBackgroundColor: NODE_BACKGROUND,
    stylingNodeBackgroundColorDataset: NODE_BACKGROUND_DATASET,
    stylingNodeHighlightBorderColor: HIGHLIGHT_NODE_BORDER,
    stylingNodeHighlightBackgroundColor: CLICK_NODE_BACKGROUND,
    stylingNodeHoverBackgroundColor: HOVER_NODE_BACKGROUND,
    stylingNodeHoverBorderColor: HOVER_NODE_BORDER,
    stylingNodeShape: NODE_DEFAULT_SHAPE,
    stylingNodeTextFontSize: 12,
    stylingNodeTextFontAlign: 'center',
    stylingNodeCaptionProperty: LABEL_PROPERTY,
    stylingNodeCaptionPropertyDataset: LABEL_PROPERTY_DATASET,
    stylingNodeOverlayOpacity: 0.1,
  },

  stylingNodeByProperty: [
    JSON.parse(JSON.stringify(NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT))
  ],

  // entry search
  entrySearchFilter: 'all',
  entrySearchResults: [],
  entrySearchAnnotationProperties: [],
  entrySearchResultsByPage: {},
  isFirstQuery: true,
  entrySearchValue: '',
  isDataEntityTypeSearch: true,
  isDatasetTypeSearch: true,
  isUpperOntologySearch: true,
  totalSearchCount: 0,
  searchPageSelected: 0,
  isSearchLoading: false,
  dataTypeSearch: 'any',
  upperOntologySearch: 'any',
  advancedSearchFilters: { 0: JSON.parse(JSON.stringify(ADVANCED_SEARCH_TEMPLATE)) },

  // node selection
  isElementSelectable: true,
  selectedElement: undefined,
  isNodeSelectable: false,
  selectedNode: '',
  prevSelectedNode: undefined,

  // edge selection
  isEdgeSelectable: false,
  selectedEdge: '',
  prevSelectedEdge: undefined,

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
    nodeId: '',
    edgeId: ''
  },

  // notes
  notes: [],
  nodesNotes: [],
  edgesNotes: [],
  selectedNotesType: 'graph',
  noteElementId: undefined,

  // synonyms
  nodesSynonyms: [],
  synonymElementId: undefined,

  // physics
  isPhysicsOn: false,
  physicsHierarchicalView: false,
  physicsRepulsion: true,

  // custom query
  customQueryOutput: undefined,
  customQueryFromLatestOutput: '',
  customQueryStringHistory: [
    'g.V().hasLabel(\'class\').count()',
    'g.V().has(\'name\', \'Link\').valueMap()',
  ],

  // graphs data storage
  lastGraphIndex: 0,
  currentGraph: 'graph-0',
  graphData: {
    'graph-0': {
      label: 'Main',
      noDelete: true,
      type: ALGO_TYPE_FULL,
      ...DEFAULT_GRAPH_VISUALISATION_OPTIONS
    }
  },

  // dropdown labels
  nodesDropdownLabels: [],
  edgesDropdownLabels: [],

  // cookies
  isCookieBarOpen: false,
  isAnalyticsCookie: undefined,
  isPreferencesCookie: undefined,
  uniqueFingerprint: undefined
}

export default initialState
