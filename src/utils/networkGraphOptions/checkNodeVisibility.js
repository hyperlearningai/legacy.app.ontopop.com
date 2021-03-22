import { NODE_TYPE, UPPER_ONTOLOGY } from '../../constants/graph'
import store from '../../store'
import checkValidProperties from './checkValidProperties'
import checkVisibilityByProperty from './checkVisibilityByProperty'

/**
 * Check node visibility
 * @param  {Object}    params
 * @param  {String}    params.nodeId              Node ID
 * @return {Boolean}   isVisible                  Node visibility flag
 */
const checkNodeVisibility = ({
  nodeId,
}) => {
  const {
    currentGraph,
    graphData,
    classesFromApiBackup
  } = store.getState()

  const {
    isUpperOntologyVisible,
    isDatasetVisible,
    hiddenNodesProperties,
  } = graphData[currentGraph]

  let isVisible = true

  if (!isUpperOntologyVisible) {
    isVisible = classesFromApiBackup[nodeId] && (!classesFromApiBackup[nodeId][UPPER_ONTOLOGY] || classesFromApiBackup[nodeId][UPPER_ONTOLOGY] === false)
  }

  if (isVisible && !isDatasetVisible) {
    isVisible = classesFromApiBackup[nodeId][NODE_TYPE] !== 'dataset'
  }

  if (isVisible) {
    const properties = checkValidProperties({
      properties: hiddenNodesProperties
    })

    if (properties.length > 0) {
      isVisible = checkVisibilityByProperty({
        element: classesFromApiBackup[nodeId],
        properties
      })
    }
  }

  return isVisible
}

export default checkNodeVisibility
