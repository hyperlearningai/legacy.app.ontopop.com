/* eslint no-param-reassign:0 */

import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'
import clearEdges from '../nodesEdgesUtils/clearEdges'
import clearNodes from '../nodesEdgesUtils/clearNodes'

/**
 * reset graph data
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue             updateStoreValue action
 * @return { undefined }
 */
const resetGraphData = ({
  updateStoreValue
}) => {
  const {
    currentPhysicsOnState
  } = store.getState()

  if (currentPhysicsOnState) {
    updateStoreValue(['isPhysicsOn'], OPERATION_TYPE_UPDATE, false)
  }

  // reset nodes/edges (display at the end of the function)
  clearEdges()
  clearNodes()

  updateStoreValue(['classesFromApi'], OPERATION_TYPE_UPDATE, {})
  updateStoreValue(['objectPropertiesFromApi'], OPERATION_TYPE_UPDATE, {})
  updateStoreValue(['classesFromApiBackup'], OPERATION_TYPE_UPDATE, {})
  updateStoreValue(['objectPropertiesFromApiBackup'], OPERATION_TYPE_UPDATE, {})
  updateStoreValue(['deletedNodes'], OPERATION_TYPE_UPDATE, [])
  updateStoreValue(['addedNodes'], OPERATION_TYPE_UPDATE, [])
  updateStoreValue(['updatedNodes'], OPERATION_TYPE_UPDATE, [])
  updateStoreValue(['deletedEdges'], OPERATION_TYPE_UPDATE, [])
  updateStoreValue(['addedEdges'], OPERATION_TYPE_UPDATE, [])
  updateStoreValue(['updatedEdges'], OPERATION_TYPE_UPDATE, [])
  updateStoreValue(['addedEdges'], OPERATION_TYPE_UPDATE, [])
  updateStoreValue(['deletedEdges'], OPERATION_TYPE_UPDATE, [])
}

export default resetGraphData
