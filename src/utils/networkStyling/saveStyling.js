import store from '../../store'
import updateNetworkStyling from './updateNetworkStyling'

/**
 * Save styling to database
 * @return {undefined}
 */
const saveStyling = async ({
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

  setSaved(true)

  await updateNetworkStyling({
    stylingJSON, addNumber, t
  })

  setTimeout(() => setSaved(false), 5000)
}

export default saveStyling
