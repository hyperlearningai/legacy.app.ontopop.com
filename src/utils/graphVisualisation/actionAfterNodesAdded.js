import store from '../../store'
import { OPERATION_TYPE_ADD, OPERATION_TYPE_UPDATE } from '../../constants/store'

/**
 * Node queue to avoid browser freezing
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue  updateStoreValue action
 * @return { undefined }
 */
const actionAfterNodesAdded = ({
  updateStoreValue
}) => {
  const {
    network,
    isPhysicsOn,
    physicsRepulsion,
  } = store.getState()

  const currentPhysicsOnState = isPhysicsOn
  const currentPhysicsRepulsionState = physicsRepulsion

  // turn physics on to scatter nodes around
  updateStoreValue(['isPhysicsOn'], OPERATION_TYPE_UPDATE, true)
  updateStoreValue(['physicsRepulsion'], OPERATION_TYPE_UPDATE, true)

  updateStoreValue(['activeLoaders'], OPERATION_TYPE_ADD, -1)

  // restore isPhysicsOn state
  setTimeout(() => {
    if (!currentPhysicsOnState) {
      updateStoreValue(['isPhysicsOn'], OPERATION_TYPE_UPDATE, false)
    }

    if (!currentPhysicsRepulsionState) {
      updateStoreValue(['physicsRepulsion'], OPERATION_TYPE_UPDATE, false)
    }

    network?.fit({
      animation: false
    })
  }, 250)
}

export default actionAfterNodesAdded
