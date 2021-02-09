import { EDGE_COLOR_HIGHLIGHTED } from '../../constants/graph'
import store from '../../store'

/**
 * Search free-text in elements' properties
 * @param  {Object}   params
 * @param  {String}   params.elementId                Edge id
 * @param  {Function} params.setPrevSelectedEdges     update previously selected edges
 * @param  {Function} params.setStoreState            setStoreState action
 * @return { undefined }
\ */
const highlightEdge = ({
  elementId,
  setPrevSelectedEdges,
  setStoreState
}) => {
  const {
    availableEdges,
    network,
  } = store.getState()

  const availableEdgesIds = availableEdges.getIds()

  if (availableEdgesIds.length > 0) {
    const edgesToAdd = availableEdgesIds.filter((edge) => availableEdges.get(edge).edgeId === elementId)

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
