import loadStyling from '../networkStyling/loadStyling'
import getGraphData from '../apiCalls/getGraphData'
import { ALGO_TYPE_FULL } from '../../constants/algorithms'
import setNodesIdsToDisplay from './setNodesIdsToDisplay'

/**
 * Graph data loading at startup
 * @param  {Object}     params
 * @param  {Function}   params.t                  Internationalisation function
 * @param  {Function}   params.setStoreState      setStoreState action
 * @param  {Function}   params.removeFromObject   removeFromObject action
 * @return { undefined }
\ */
const startupActions = async ({
  setStoreState,
  removeFromObject,
  t
}) => {
  // load saved styling options
  loadStyling({
    setStoreState
  })

  // get graph data
  await getGraphData({
    setStoreState,
    t
  })

  setNodesIdsToDisplay({
    type: ALGO_TYPE_FULL,
    setStoreState,
    removeFromObject,
    t
  })
}

export default startupActions
