import { EDGE_COLOR_HIGHLIGHTED } from '../constants/graph'

/**
 * Search free-text in elements' properties
 * @param  {Object}   params
 * @param  {Object}   params.availableEdges           Available edges on canvas (DataSet)
 * @param  {Object}   params.availableEdgesNormalised Available edges on canvas (normalised object)
 * @param  {String}   params.elementId                Edge id
 * @param  {Object}   params.network                  Network object
 * @param  {Function} params.setPrevSelectedEdges     update previously selected edges
 * @param  {Function} params.setStoreState            setStoreState action
 * @return
 */
const highlightEdge = ({
  availableEdges,
  availableEdgesNormalised,
  elementId,
  network,
  setPrevSelectedEdges,
  setStoreState
}) => {
  const availableEdgesIds = Object.keys(availableEdgesNormalised)

  if (availableEdgesIds.length > 0) {
    const edgesToAdd = availableEdgesIds.filter((edge) => availableEdgesNormalised[edge].edgeId === elementId)

    edgesToAdd.map((edge) => {
      availableEdges.update(
        [{ id: edge, color: EDGE_COLOR_HIGHLIGHTED }]
      )
      return availableEdges.update(
        [{ id: edge, width: 3 }]
      )
    })

    setPrevSelectedEdges(edgesToAdd)
  }

  network.fit({
    animation: true
  })

  setStoreState('freeTextSelectedElement', elementId)
}

export default highlightEdge
