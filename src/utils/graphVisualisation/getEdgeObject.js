import { generatePredicateId } from '../../constants/functions'
import store from '../../store'

/**
 * Get edge info and related nodes
 * @param  {Object}   params
 * @param  {String}   params.from                    Subject node ID
 * @param  {String}   params.predicate               Predicate node ID
 * @param  {String}   params.to                      Object node ID
 * @return {Object}   output
 * @return {String}   output.edgeUniqueID            Edge unique ID
 * @return {Object}   output.edgeConnection          Edge connection containing nodes IDs and labels
 * @return {Object}   output.edge                    Edge object
 * @return {Object}   output.fromObject              Subject node object
 * @return {Object}   output.toObject                Object node object
 */
const getEdgeObject = ({
  from,
  predicate,
  to,
}) => {
  const {
    stylingNodeCaptionProperty,
    classesFromApi,
    objectPropertiesFromApi,
  } = store.getState()

  const edgeUniqueId = generatePredicateId({
    predicate,
    from,
    to
  })

  const edgeLabel = objectPropertiesFromApi[predicate][stylingNodeCaptionProperty]
  const fromObject = classesFromApi[from]
  fromObject.id = from
  fromObject.label = fromObject[stylingNodeCaptionProperty]
    ? fromObject[stylingNodeCaptionProperty].replace(/ /g, '\n') : ''

  const fromLabel = fromObject[stylingNodeCaptionProperty]
  const toObject = classesFromApi[to]
  toObject.id = to
  toObject.label = toObject[stylingNodeCaptionProperty]
    ? toObject[stylingNodeCaptionProperty].replace(/ /g, '\n') : ''

  const toLabel = toObject[stylingNodeCaptionProperty]

  const edgeConnection = {
    from,
    fromLabel,
    to,
    toLabel,
  }

  const edge = {
    ...edgeConnection,
    ...objectPropertiesFromApi[predicate],
    label: edgeLabel,
    edgeId: predicate,
    id: edgeUniqueId,
  }

  return ({
    edgeUniqueId,
    edgeConnection,
    edge,
    fromObject,
    toObject
  })
}

export default getEdgeObject