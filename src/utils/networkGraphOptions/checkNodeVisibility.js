import { NODE_TYPE, UPPER_ONTOLOGY, USER_DEFINED_PROPERTY } from '../../constants/graph'
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
    classesFromApiBackup,
    totalEdgesPerNode,
    highlightedNodes
  } = store.getState()

  const {
    isUserDefinedNodeVisible,
    isOrphanNodeVisible,
    isUpperOntologyVisible,
    isDatasetVisible,
    hiddenNodesProperties,
  } = graphData[currentGraph]

  let isVisible = true

  const nodeEdges = totalEdgesPerNode[nodeId]

  const isUserDefined = classesFromApiBackup[nodeId] && classesFromApiBackup[nodeId][USER_DEFINED_PROPERTY]

  if (!isUserDefinedNodeVisible) {
    isVisible = !isUserDefined
  }

  if (isVisible && !isUserDefined && !isOrphanNodeVisible) {
    isVisible = !(!highlightedNodes.includes(nodeId) && !nodeEdges)
  }

  if (isVisible && !isUpperOntologyVisible) {
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
