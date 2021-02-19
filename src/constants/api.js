export const API_ENDPOINT = `${process.env.endpointUrl}/api` // 'http://localhost:8080/api'

export const GET_ONTOLOGY = `${API_ENDPOINT}/ontology`
export const GET_GRAPH = `${API_ENDPOINT}/graph`
export const GET_GRAPH_QUERY = `${GET_GRAPH}/query`

export const GET_EDGES = `${GET_GRAPH}/edges`
export const GET_EDGE = `${GET_GRAPH}/edges/{id}`

export const GET_NODES = `${GET_GRAPH}/nodes`
export const GET_NODE = `${GET_GRAPH}/nodes/{id}`

// export const GET_PROPERTIES = `${GET_GRAPH}/properties`
// export const GET_PROPERTIES_OBJECTS = `${GET_PROPERTIES}/objects`
// export const GET_PROPERTIES_OBJECT = `${GET_PROPERTIES}/objects/{id}`
// export const GET_PROPERTIES_ANNOTATIONS = `${GET_PROPERTIES}/annotations`
// export const GET_PROPERTIES_ANNOTATION = `${GET_PROPERTIES}/annotations/{id}`
export const GET_PROPERTIES = `${GET_ONTOLOGY}/properties`
export const GET_PROPERTIES_OBJECTS = `${GET_PROPERTIES}/objects`
export const GET_PROPERTIES_OBJECT = `${GET_PROPERTIES}/objects/{id}`
export const GET_PROPERTIES_ANNOTATIONS = `${GET_PROPERTIES}/annotations`
export const GET_PROPERTIES_ANNOTATION = `${GET_PROPERTIES}/annotations/{id}`

export const AUTH_SIGN_IN = `${API_ENDPOINT}/login`
