import { NODE_TYPE, UPPER_ONTOLOGY } from '../../constants/graph'
import store from '../../store'

/**
 * Check node visibility
 * @param  {Object}    params
 * @param  {String}    params.nodeId              Node ID
 * @param  {Function}  params.toggleFromSubArray  toggleFromSubArray action
 * @return {Boolean}   isVisible                  Node visibility flag
 */
const checkNodeVisibility = ({
  nodeId,
  toggleFromSubArray
}) => {
  const {
    currentGraph,
    graphData,
    classesFromApiBackup
  } = store.getState()

  const {
    isUpperOntologyVisible,
    isDatasetVisible,
  } = graphData[currentGraph]

  let isVisible = true

  if (!isUpperOntologyVisible) {
    isVisible = classesFromApiBackup[nodeId] && (!classesFromApiBackup[nodeId][UPPER_ONTOLOGY] || classesFromApiBackup[nodeId][UPPER_ONTOLOGY] === false)
  }

  if (isVisible && !isDatasetVisible) {
    isVisible = classesFromApiBackup[nodeId][NODE_TYPE] !== 'dataset'
  }

  if (!isVisible) {
    toggleFromSubArray('graphData', currentGraph, 'hiddenNodes', nodeId)
  }

  return isVisible
}

export default checkNodeVisibility
