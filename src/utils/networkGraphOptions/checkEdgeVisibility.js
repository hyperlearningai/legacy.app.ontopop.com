import {
  LABEL_PROPERTY,
} from '../../constants/graph'
import store from '../../store'
import checkValidProperties from './checkValidProperties'
import checkVisibilityByProperty from './checkVisibilityByProperty'

/**
 * Check edge visibility
 * @param  {Object}   params
 * @param  {String}   params.edgeId                 Edge ID
 * @param  {Function} params.toggleFromSubArray     toggleFromSubArray action
 * @return {Boolean}  isVisible                     Edge visibility flag
 */
const checkEdgeVisibility = ({
  edgeId,
  toggleFromSubArray
}) => {
  const {
    currentGraph,
    graphData,
    objectPropertiesFromApiBackup
  } = store.getState()

  const {
    isSubClassEdgeVisible,
    hiddenEdgesProperties,
  } = graphData[currentGraph]

  let isVisible = true

  if (!isSubClassEdgeVisible) {
    isVisible = objectPropertiesFromApiBackup[edgeId][LABEL_PROPERTY] !== 'Subclass of'
  }

  if (isVisible) {
    if (isVisible) {
      const properties = checkValidProperties({
        properties: hiddenEdgesProperties
      })

      if (properties.length > 0) {
        isVisible = checkVisibilityByProperty({
          element: objectPropertiesFromApiBackup[edgeId],
          properties
        })
      }
    }
  }

  if (!isVisible) {
    toggleFromSubArray('graphData', currentGraph, 'hiddenEdges', edgeId)
  }

  return isVisible
}

export default checkEdgeVisibility
