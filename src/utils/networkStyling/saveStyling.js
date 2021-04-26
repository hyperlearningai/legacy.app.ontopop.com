import { STYLING_LS } from '../../constants/localStorage'
import store from '../../store'
import updateNetworkStyling from './updateNetworkStyling'

/**
 * Save styling to database
 * @return {undefined}
 */
const saveStyling = async ({
  setSaved,
  updateStoreValue,
  t
}) => {
  const {
    globalNodeStyling,
    userDefinedNodeStyling,
    stylingNodeByProperty,
    globalEdgeStyling,
    userDefinedEdgeStyling,
    stylingEdgeByProperty,
    user
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

  if (user.isGuest) {
    localStorage.setItem(STYLING_LS, stylingJSON)
  } else {
    await updateNetworkStyling({
      stylingJSON, updateStoreValue, t
    })
  }

  setSaved(false)
}

export default saveStyling
