export const ROUTE_LOGIN = '/login'
export const ROUTE_PROFILE = '/profile'
export const ROUTE_FORGOT_PASSWORD = '/forgot-password'
export const ROUTE_INDEX = '/'
export const ROUTE_LISTING = '/listing'
export const ROUTE_SEARCH = '/app'
export const ROUTE_NETWORK_GRAPHS = '/app/network-graphs'
export const ROUTE_NETWORK_GRAPH_OPTIONS = '/app/network-graph-options'
export const ROUTE_ELEMENTS_SELECTION = '/app/elements-selection'
export const ROUTE_ELEMENTS_FILTER = '/app/elements-filter'
export const ROUTE_EDGES_FILTER = '/app/edges-filter'
export const ROUTE_BOUNDING_BOX = '/app/bounding-box'
export const ROUTE_NODE_NEIGHBOURHOOD = '/app/node-neighbourhood'
export const ROUTE_SHORTEST_PATH = '/app/shortest-path'
export const ROUTE_SETTINGS = '/app/settings'
export const ROUTE_CUSTOM_QUERY = '/app/custom-query'
export const ROUTE_STYLING = '/app/styling'
export const ROUTE_NOTES = '/app/notes'
export const ROUTE_SYNONYMS = '/app/synonyms'
export const ROUTE_EXPORT = '/app/export'
export const ROUTE_EDIT_ONTOLOGY = '/app/edit-ontology'

export const DYNAMIC_ROUTES = [
  ROUTE_SEARCH,
  ROUTE_NETWORK_GRAPHS,
  ROUTE_NETWORK_GRAPH_OPTIONS,
  ROUTE_ELEMENTS_FILTER,
  ROUTE_EDGES_FILTER,
  ROUTE_ELEMENTS_SELECTION,
  ROUTE_BOUNDING_BOX,
  ROUTE_NODE_NEIGHBOURHOOD,
  ROUTE_SHORTEST_PATH,
  ROUTE_SETTINGS,
  ROUTE_CUSTOM_QUERY,
  ROUTE_STYLING,
  ROUTE_NOTES,
  ROUTE_SYNONYMS,
  ROUTE_EXPORT,
  ROUTE_EDIT_ONTOLOGY
]

export const AUTH_ROUTES = [
  ROUTE_LOGIN,
  ROUTE_FORGOT_PASSWORD
]

export const VALID_ROUTES = [
  ...DYNAMIC_ROUTES,
  ...AUTH_ROUTES,
  ROUTE_LISTING,
  ROUTE_PROFILE,
  ROUTE_INDEX
]

export const FORM_LINK = 'https://forms.office.com/Pages/ResponsePage.aspx?id=sp9QKa9_i0-3ojL5bsXebMHGED18T-VBrbTcXx4rIrtUNVdHRDQ1SVdQVFg4UDlTR1MwWThITjM4Qy4u'
export const DATASET_REPO_URL = 'https://highways.sharepoint.com/'
export const BASE_URL = 'https://ontopop.com'
