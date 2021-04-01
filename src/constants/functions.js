export const getElementProperties = (element) => Object.keys(element).filter((elementKey) => typeof elementKey !== 'object')
export const getEdgeAndNodes = (edge) => edge.split('___')
export const getNodesInEdge = (edge) => getEdgeAndNodes(edge).slice(-2)
export const getEdgeUniqueId = (edge) => getEdgeAndNodes(edge)[0]
export const getPathEdges = (path) => path.split('|||')
export const toDashedCase = (text) => text.replace(/[A-Z]/g, '-$&').toLowerCase()
export const turnToRoute = (text) => `/app/${text}`
