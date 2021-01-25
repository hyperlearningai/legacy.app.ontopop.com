import { EDGE_COLOR_HIGHLIGHTED } from '../constants/graph'
import store from '../store'

/**
 * Search free-text in elements' properties
 * @param  {Object}   params
 * @param  {String}   params.elementId                Edge id
 * @param  {Function} params.setPrevSelectedEdges     update previously selected edges
 * @param  {Function} params.setStoreState            setStoreState action
 * @return
 */
const highlightEdge = ({
  elementId,
  setPrevSelectedEdges,
  setStoreState
}) => {
  const {
    availableEdges,
    availableEdgesNormalised,
    network,
  } = store.getState()

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
