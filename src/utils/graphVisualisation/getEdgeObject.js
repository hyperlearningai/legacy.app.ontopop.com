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

  const edgeLabel = edge[stylingEdgeCaptionProperty]

  const edgeObject = {
    ...edge,
    label: edgeLabel,
  }

  return edgeObject
}

export default getEdgeObject
