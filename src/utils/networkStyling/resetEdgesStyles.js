import store from '../../store'
import getPhysicsOptions from '../graphVisualisation/getPhysicsOptions'

/**
 * Reset edges which have been styled
 * @return { undefined }
 */
const resetEdgesStyles = () => {
  const {
    network
  } = store.getState()

  network.setOptions(getPhysicsOptions())
}

export default resetEdgesStyles
