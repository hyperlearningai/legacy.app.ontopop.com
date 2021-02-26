/* eslint no-param-reassign:0 */

import store from '../../store'
import clearEdges from '../nodesEdgesUtils/clearEdges'
import clearNodes from '../nodesEdgesUtils/clearNodes'

/**
 * reset graph data
 * @param  {Object}   params
 * @param  {Function} params.setStoreState             setStoreState action
 * @return { undefined }
 */
const resetGraphData = ({
  setStoreState
}) => {
  const {
    currentPhysicsOnState
  } = store.getState()

  if (currentPhysicsOnState) {
    setStoreState('isPhysicsOn', false)
  }

  // reset nodes/edges (display at the end of the function)
  clearEdges()
  clearNodes()

  setStoreState('classesFromApi', {})
  setStoreState('objectPropertiesFromApi', {})
  setStoreState('classesFromApiBackup', {})
  setStoreState('objectPropertiesFromApiBackup', {})
  setStoreState('deletedNodes', [])
  setStoreState('addedNodes', [])
  setStoreState('updatedNodes', [])
  setStoreState('deletedEdges', [])
  setStoreState('addedEdges', [])
  setStoreState('updatedEdges', [])
  setStoreState('addedEdges', [])
  setStoreState('deletedEdges', [])
}

export default resetGraphData
