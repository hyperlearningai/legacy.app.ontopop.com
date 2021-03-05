import store from '../../store'
import getPhysicsOptions from '../graphVisualisation/getPhysicsOptions'

/**
 * Reset nodes which have been styled
 * @return { undefined }
 */
const resetNodesStyles = () => {
  const {
    network
  } = store.getState()

  network.setOptions(getPhysicsOptions())
}

export default resetNodesStyles
