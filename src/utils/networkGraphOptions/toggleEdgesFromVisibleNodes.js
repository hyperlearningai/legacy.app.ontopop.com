/* eslint no-console:0 */
import { OPERATION_TYPE_ADD } from '../../constants/store'
import store from '../../store'
import setEdgesStyle from '../networkStyling/setEdgesStyle'
import toggleEdge from './toggleEdge'
import updateStyleAndPhysics from './updateStyleAndPhysics'

/**
 * Add node to graph
 * @param  {Object}     params
 * @param  {Array}      params.visibleNodes               Visible nodes
 * @param  {Function}   params.updateStoreValue              updateStoreValue action
 * @return { undefined }
\ */
const toggleEdgesFromVisibleNodes = ({
  visibleNodes,
  updateStoreValue
}) => {
  const {
    objectPropertiesFromApiBackup,
    totalEdgesPerNode
  } = store.getState()

  const uniqueEdges = []

  if (visibleNodes.length === 0) return false

  updateStoreValue(['activeLoaders'], OPERATION_TYPE_ADD, 1)

  return visibleNodes.map((nodeId, nodeIndex) => {
    const edgeIds = totalEdgesPerNode[nodeId]

    const isLastNode = nodeIndex === visibleNodes.length - 1

    if (!edgeIds || edgeIds.length === 0) {
      if (
        isLastNode
      ) {
        updateStoreValue(['activeLoaders'], OPERATION_TYPE_ADD, -1)

        setEdgesStyle()

        updateStyleAndPhysics({
          updateStoreValue
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
          updateStoreValue(['activeLoaders'], OPERATION_TYPE_ADD, -1)

          setEdgesStyle()

          updateStyleAndPhysics({
            updateStoreValue
          })
        }
        return false
      }

      return toggleEdge({
        edgeId,
        updateStoreValue,
        isLastEdge
      })
    })
  })
}

export default toggleEdgesFromVisibleNodes
