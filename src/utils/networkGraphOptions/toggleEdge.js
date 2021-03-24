import store from '../../store'
import addEdge from '../nodesEdgesUtils/addEdge'
import removeEdge from '../nodesEdgesUtils/removeEdge'
import checkEdgeVisibility from './checkEdgeVisibility'
import setEdgesStyle from '../networkStyling/setEdgesStyle'
import updateStyleAndPhysics from './updateStyleAndPhysics'

/**
 * toggle edge visibility
 * @param  {Object}    params
 * @param  {Function}  params.updateStoreValue         updateStoreValue action
 * @return {undefined}
 */
const toggleEdge = ({
  edgeId,
  updateStoreValue,
  isLastEdge
}) => {
  const {
    objectPropertiesFromApiBackup
  } = store.getState()

  const edge = objectPropertiesFromApiBackup[edgeId]

  const isVisible = checkEdgeVisibility({
    edgeId,
  })

  setTimeout(() => {
    if (isVisible) {
      addEdge({
        edge,
        updateStoreValue,
      })
    } else {
      removeEdge({
        edge,
        updateStoreValue,
      })
    }

    if (isLastEdge) {
      updateStoreValue('activeLoaders', -1)

      setEdgesStyle()

      updateStyleAndPhysics({
        updateStoreValue
      })
    }
  }, 1)
}

export default toggleEdge
