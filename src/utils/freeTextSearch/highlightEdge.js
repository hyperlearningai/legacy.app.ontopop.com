import { EDGE_COLOR_HIGHLIGHTED } from '../../constants/graph'
import store from '../../store'
import getEdgeIds from '../nodesEdgesUtils/getEdgeIds'
import updateEdges from '../nodesEdgesUtils/updateEdges'
import getEdge from '../nodesEdgesUtils/getEdge'

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
    network,
  } = store.getState()

  const availableEdgesIds = getEdgeIds()

  if (availableEdgesIds.length > 0) {
    const edgesToAdd = availableEdgesIds.filter((edge) => getEdge(edge).edgeId === elementId)

    edgesToAdd.map((edge) => updateEdges(
      [{ id: edge, color: EDGE_COLOR_HIGHLIGHTED, width: 3 }]
    ))

    setPrevSelectedEdges(edgesToAdd)
  }

  network.fit({
    animation: true
  })

  setStoreState('freeTextSelectedElement', elementId)
}

export default highlightEdge
