import store from '../../store'
import addEdge from '../nodesEdgesUtils/addEdge'
import removeEdge from '../nodesEdgesUtils/removeEdge'
import checkEdgeVisibility from './checkEdgeVisibility'
import setEdgesStyle from '../networkStyling/setEdgesStyle'
import updateStyleAndPhysics from './updateStyleAndPhysics'

/**
 * Check edge visibility
 * @param  {Object}    params
 * @param  {Function}  params.toggleFromArrayInKey  toggleFromArrayInKey action
 * @param  {Function}  params.setStoreState         setStoreState action
 * @return {undefined}
 */
const toggleEdge = ({
  edgeId,
  addNumber,
  toggleFromArrayInKey,
  setStoreState,
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
        addNumber,
        toggleFromArrayInKey
      })
    } else {
      removeEdge({
        edge,
        addNumber,
        toggleFromArrayInKey
      })
    }

    if (isLastEdge) {
      addNumber('activeLoaders', -1)

      setEdgesStyle()

      updateStyleAndPhysics({
        setStoreState
      })
    }
  }, 1)
}

export default toggleEdge
