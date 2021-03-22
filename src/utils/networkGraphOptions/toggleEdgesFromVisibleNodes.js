/* eslint no-console:0 */
import store from '../../store'
import setEdgesStyle from '../networkStyling/setEdgesStyle'
import toggleEdge from './toggleEdge'
import updateStyleAndPhysics from './updateStyleAndPhysics'

/**
 * Add node to graph
 * @param  {Object}     params
 * @param  {Array}      params.visibleNodes               Visible nodes
 * @param  {Function}   params.toggleFromArrayInKey       toggleFromArrayInKey action
 * @param  {Function}   params.setStoreState              setStoreState action
 * @return { undefined }
\ */
const toggleEdgesFromVisibleNodes = ({
  visibleNodes,
  toggleFromArrayInKey,
  setStoreState,
  toggleFromSubArray,
  addNumber
}) => {
  const {
    objectPropertiesFromApiBackup,
    totalEdgesPerNode
  } = store.getState()

  const uniqueEdges = []

  if (visibleNodes.length === 0) return false

  addNumber('activeLoaders', 1)

  return visibleNodes.map((nodeId, nodeIndex) => {
    const edgeIds = totalEdgesPerNode[nodeId]

    const isLastNode = nodeIndex === visibleNodes.length - 1

    if (!edgeIds || edgeIds.length === 0) {
      if (
        isLastNode
      ) {
        addNumber('activeLoaders', -1)

        setEdgesStyle()

        updateStyleAndPhysics({
          setStoreState
        })
      }
      return false
    }

    return edgeIds.map((edgeId, edgeIndex) => {
      const {
        from,
        to
      } = objectPropertiesFromApiBackup[edgeId]

      const isLastEdge = isLastNode && (edgeIndex === edgeIds.length - 1)

      const nodeToCheck = from === nodeId ? to : from

      if (!visibleNodes.includes(nodeToCheck)
      || uniqueEdges.includes(edgeId)) {
        if (isLastEdge) {
          addNumber('activeLoaders', -1)

          setEdgesStyle()

          updateStyleAndPhysics({
            setStoreState
          })
        }
        return false
      }

      return toggleEdge({
        edgeId,
        addNumber,
        toggleFromArrayInKey,
        toggleFromSubArray,
        setStoreState,
        isLastEdge
      })
    })
  })
}

export default toggleEdgesFromVisibleNodes
