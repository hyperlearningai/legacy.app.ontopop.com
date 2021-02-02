import { generatePredicateId, getPathEdges } from '../../constants/functions'

/**
 * Get edge info and related nodes
 * @param  {Object}   params
 * @param  {Object}   params.classesFromApi          Nodes from initial OwlClasses
 * @param  {String}   params.from                    Subject node ID
 * @param  {Boolean}  params.isNodeOverlay           Flag to make non-highlighted nodes transparent
 * @param  {Object}   params.objectPropertiesFromApi Edges from initial OwlObjectProperties
 * @param  {Array}    params.shortestPathResults     Array of strings with concatenated nodes and edges
 * @param  {String}   params.predicate               Predicate node ID
 * @param  {String}   params.to                      Object node ID
 * @return {Object}   output
 * @return {String}   output.edgeUniqueID            Edge unique ID
 * @return {Object}   output.edgeConnection          Edge connection containing nodes IDs and labels
 * @return {Object}   output.edge                    Edge object
 * @return {Object}   output.fromObject              Subject node object
 * @return {Object}   output.toObject                Object node object
 */
const getEdge = ({
  classesFromApi,
  from,
  isNodeOverlay,
  objectPropertiesFromApi,
  shortestPathResults,
  predicate,
  to,
}) => {
  const edgeUniqueId = generatePredicateId({
    predicate,
    from,
    to
  })
  const edgeLabel = objectPropertiesFromApi[predicate].rdfsLabel
  const fromObject = classesFromApi[from]
  fromObject.id = from
  fromObject.label = fromObject.rdfsLabel
    ? fromObject.rdfsLabel.replace(/ /g, '\n') : ''

  const fromLabel = fromObject.rdfsLabel
  const toObject = classesFromApi[to]
  toObject.id = to
  toObject.label = toObject.rdfsLabel
    ? toObject.rdfsLabel.replace(/ /g, '\n') : ''

  const toLabel = toObject.rdfsLabel

  const edgeConnection = {
    from,
    fromLabel,
    to,
    toLabel,
  }

  const edge = {
    ...edgeConnection,
    label: edgeLabel,
    edgeId: predicate,
    id: edgeUniqueId
  }

  if (isNodeOverlay) {
    const pathEdges = getPathEdges(shortestPathResults.join('|||'))

    if (!pathEdges.includes(edgeUniqueId)) {
      edge.dashes = true
      edge.width = 0.2
      edge.arrows = {
        to: { scaleFactor: 0.2 }
      }
    } else {
      edge.dashes = false
      edge.width = 3
    }
  }

  return ({
    edgeUniqueId,
    edgeConnection,
    edge,
    fromObject,
    toObject
  })
}

export default getEdge
