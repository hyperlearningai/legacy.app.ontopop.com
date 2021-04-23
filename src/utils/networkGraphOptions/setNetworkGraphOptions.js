import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'

/**
 * Set network graph options
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue          updateStoreValue action
 * @param  {Object}   params.hiddenNodesProperties     Properties to hide nodes
 * @param  {Object}   params.hiddenEdgesProperties     Properties to hide edges
 * @param  {Boolean}  params.isUserDefinedNodeVisible  Show user-defined nodes flag
 * @param  {Boolean}  params.isOrphanNodeVisible       Show orphan nodes flag
 * @param  {Boolean}  params.isUpperOntologyVisible    Show upper ontology flag
 * @param  {Boolean}  params.isSubClassEdgeVisible     Show subclass edges flag
 * @param  {Boolean}  params.isDatasetVisible          Show dataset nodes flag
 * @return { undefined }
 */
const setNetworkGraphOptions = ({
  isUserDefinedNodeVisible,
  isOrphanNodeVisible,
  isUpperOntologyVisible,
  isSubClassEdgeVisible,
  isDatasetVisible,
  hiddenNodesProperties,
  hiddenEdgesProperties,
  updateStoreValue,
}) => {
  const {
    currentGraph,
    graphData
  } = store.getState()

  const currentGraphObject = {
    ...graphData[currentGraph],
    isUserDefinedNodeVisible,
    isOrphanNodeVisible,
    isUpperOntologyVisible,
    isSubClassEdgeVisible,
    isDatasetVisible,
    hiddenNodesProperties,
    hiddenEdgesProperties,
  }

  updateStoreValue(['graphData', currentGraph], OPERATION_TYPE_UPDATE, currentGraphObject)
  updateStoreValue(['nodesIdsToDisplay'], OPERATION_TYPE_UPDATE, currentGraphObject.nodesIds)
}

export default setNetworkGraphOptions
