export const getElementProperties = (element) => Object.keys(element).filter((elementKey) => typeof elementKey !== 'object')
export const getEdgeUniqueId = (edge) => edge.split('___')[0]
