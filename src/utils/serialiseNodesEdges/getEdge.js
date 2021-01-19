/**
 * Get edge info and related nodes
 * @param  {Object}   params
 * @param  {String}   params.from                    Subject node ID
 * @param  {String}   params.predicate               Predicate node ID
 * @param  {String}   params.to                      Object node ID
 * @param  {Object}   params.classesFromApi          Nodes from initial OwlClasses
 * @param  {Object}   params.objectPropertiesFromApi Edges from initial OwlObjectProperties
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
  objectPropertiesFromApi,
  predicate,
  to,
}) => {
  const edgeUniqueId = `${predicate}___${from}___${to}`
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

  return ({
    edgeUniqueId,
    edgeConnection,
    edge,
    fromObject,
    toObject
  })
}

export default getEdge
