export const ENDPOINT_URL = process.env.NEXT_PUBLIC_API_ENDPOINT
export const COLLABORATION_URL = process.env.NEXT_PUBLIC_COLLABORATION_API_ENDPOINT
export const API_COLLABORATION_ENDPOINT = `${COLLABORATION_URL}/api`
export const API_ENDPOINT = `${ENDPOINT_URL}/api`

export const GET_ONTOLOGY = `${API_ENDPOINT}/ontology`
export const GET_GRAPH = `${API_ENDPOINT}/graph`
export const GET_COLLABORATION_GRAPH = `${API_COLLABORATION_ENDPOINT}/graph`

export const MODEL_1 = '?model=1'
export const GET_GRAPH_MODEL_1 = `${GET_GRAPH}${MODEL_1}`
export const GET_GRAPH_QUERY = `${GET_GRAPH}/query`

export const GET_EDGES = `${GET_GRAPH}/edges`
export const GET_EDGE = `${GET_EDGES}/{id}`

export const POST_CREATE_EDGE = `${GET_EDGES}/create${MODEL_1}`
export const PATCH_UPDATE_EDGE = `${GET_EDGES}/{id}${MODEL_1}`
export const DELETE_EDGE = `${GET_EDGES}/{id}${MODEL_1}`

export const GET_NODES = `${GET_GRAPH}/nodes`
export const GET_NODE = `${GET_GRAPH}/nodes/{id}`

export const POST_CREATE_NODE = `${GET_NODES}/create${MODEL_1}`
export const PATCH_UPDATE_NODE = `${GET_NODES}/{id}${MODEL_1}`
export const DELETE_NODE = `${GET_NODES}/{id}${MODEL_1}`

export const GET_PROPERTIES = `${GET_ONTOLOGY}/properties`
export const GET_PROPERTIES_OBJECTS = `${GET_PROPERTIES}/objects`
export const GET_PROPERTIES_OBJECT = `${GET_PROPERTIES}/objects/{id}`
export const GET_PROPERTIES_ANNOTATIONS = `${GET_PROPERTIES}/annotations`
export const GET_PROPERTIES_ANNOTATION = `${GET_PROPERTIES}/annotations/{id}`

export const GET_GRAPH_NOTES = `${GET_COLLABORATION_GRAPH}/notes`
export const GET_GRAPH_NOTE = `${GET_COLLABORATION_GRAPH}/notes/{id}`
export const POST_CREATE_GRAPH_NOTE = `${GET_COLLABORATION_GRAPH}/notes/create`
export const PATCH_UPDATE_GRAPH_NOTE = `${GET_COLLABORATION_GRAPH}/notes/{id}`
export const DELETE_GRAPH_NOTE = `${GET_COLLABORATION_GRAPH}/notes/{id}`

export const GET_NODES_NOTES = `${GET_COLLABORATION_GRAPH}/nodes/notes`
export const GET_NODE_NOTES = `${GET_COLLABORATION_GRAPH}/nodes/{node_id}/notes`
export const GET_NODE_NOTE = `${GET_COLLABORATION_GRAPH}/nodes/{node_id}/notes/{id}`
export const POST_CREATE_NODE_NOTE = `${GET_COLLABORATION_GRAPH}/nodes/{node_id}/notes/create`
export const PATCH_UPDATE_NODE_NOTE = `${GET_COLLABORATION_GRAPH}/nodes/{node_id}/notes/{id}`
export const DELETE_NODE_NOTE = `${GET_COLLABORATION_GRAPH}/nodes/{node_id}/notes/{id}`

export const GET_EDGES_NOTES = `${GET_COLLABORATION_GRAPH}/edges/notes`
export const GET_EDGE_NOTES = `${GET_COLLABORATION_GRAPH}/edges/{edge_id}/notes`
export const GET_EDGE_NOTE = `${GET_COLLABORATION_GRAPH}/edges/{edge_id}/notes/{id}`
export const POST_CREATE_EDGE_NOTE = `${GET_COLLABORATION_GRAPH}/edges/{edge_id}/notes/create`
export const PATCH_UPDATE_EDGE_NOTE = `${GET_COLLABORATION_GRAPH}/edges/{edge_id}/notes/{id}`
export const DELETE_EDGE_NOTE = `${GET_COLLABORATION_GRAPH}/edges/{edge_id}/notes/{id}`

export const AUTH_SIGN_IN = `${API_ENDPOINT}/auth/login`
