// import jsonClasses from '../../assets/json/test-ontology-classes.json'
// import jsonObjectProperties from '../../assets/json/test-ontology-object-properties.json'
import loadStyling from '../networkStyling/loadStyling'
import getGraphData from '../apiCalls/getGraphData'
import getNodeProperties from '../apiCalls/getNodeProperties'
// import setGraphData from './setGraphData'
// import { SUB_CLASS_OF_ID, SUB_CLASS_OF_LABEL } from '../../constants/graph'

/**
 * Graph data loading at startup
 * @param  {Object}     params
 * @param  {Function}   params.t                  Internationalisation function
 * @param  {Function}   params.setStoreState      setStoreState action
 * @return { undefined }
\ */
const startupActions = async ({
  setStoreState,
  t
}) => {
  // load saved styling options
  loadStyling({
    setStoreState
  })

  // get and set annotation properties
  getNodeProperties({
    setStoreState,
    t
  })

  // get graph data
  getGraphData({
    setStoreState,
    t
  })
}

export default startupActions
