import store from '../../store'

/**
 * Get edge object
 * @param  {Object}   params
 * @param  {Object}   params.edge                 Edge object
 * @return {Object}   edgeObject                  Updated edge object
 */
const getEdgeObject = ({
  edge,
}) => {
  const {
    stylingEdgeCaptionProperty,
  } = store.getState()

  const {
    edgeProperties,
    sourceNodeId,
    targetNodeId,
    edgeId
  } = edge

  const edgeLabel = edge[stylingEdgeCaptionProperty]
  const id = edgeId.toString()

  const edgeObject = {
    rdfAbout: edgeProperties.objectPropertyRdfAbout || '',
    rdfsLabel: edgeProperties.objectPropertyRdfsLabel || '',
    label: edgeLabel,
    predicate: id,
    id,
    from: sourceNodeId.toString(),
    to: targetNodeId.toString(),
  }

  return edgeObject
}

export default getEdgeObject
