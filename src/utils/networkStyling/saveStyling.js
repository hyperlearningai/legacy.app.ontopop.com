import store from '../../store'
import updateNetworkStyling from './updateNetworkStyling'

/**
 * Save styling to local storage
 * @return {undefined}
 */
const saveStyling = ({
  setSaved,
  addNumber,
  t
}) => {
  const {
    globalNodeStyling,
    userDefinedNodeStyling,
    stylingNodeByProperty,
    globalEdgeStyling,
    userDefinedEdgeStyling,
    stylingEdgeByProperty,
  } = store.getState()

  const stylingJSON = JSON.stringify({
    globalNodeStyling,
    userDefinedNodeStyling,
    stylingNodeByProperty,
    globalEdgeStyling,
    userDefinedEdgeStyling,
    stylingEdgeByProperty,
  })

  updateNetworkStyling({ stylingJSON, addNumber, t })

  setSaved(true)

  setTimeout(() => setSaved(false), 5000)
}

export default saveStyling
