import { STYLING_LS } from '../../constants/localStorage'
import store from '../../store'

/**
 * Save styling to local storage
 * @return {undefined}
 */
const saveStyling = ({
  setSaved
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

  localStorage.setItem(STYLING_LS, stylingJSON)

  setSaved(true)

  setTimeout(() => setSaved(false), 5000)
}

export default saveStyling
