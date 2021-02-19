import { ALGO_TYPE_FULL } from '../../constants/algorithms'
import setNodesIdsToDisplay from './setNodesIdsToDisplay'

/**
 * Set graph full data
 * @param  {Object}   params
 * @param  {Function} params.setStoreState             setStoreState action
 * @return { undefined }
 */
const setGraphData = async ({
  setStoreState,
}) => {
  // show full view when starting
  setNodesIdsToDisplay({
    type: ALGO_TYPE_FULL,
    setStoreState
  })
}

export default setGraphData
