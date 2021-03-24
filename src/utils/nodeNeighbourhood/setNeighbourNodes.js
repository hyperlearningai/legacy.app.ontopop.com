import { ALGO_TYPE_NEIGHBOURHOOD } from '../../constants/algorithms'
import { DEFAULT_GRAPH_VISUALISATION_OPTIONS } from '../../constants/graph'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import { SIDEBAR_VIEW_GRAPHS } from '../../constants/views'
import store from '../../store'

/**
 * Set neighbout nodes
 * @param  {Object}   params
 * @param  {Number}   params.separationDegree          Separation degree integer
 * @param  {Function} params.updateStoreValue          updateStoreValue action
 * @return { undefined }
 */
const setNeighbourNodes = ({
  separationDegree,
  updateStoreValue,
}) => {
  const {
    classesFromApi,
    selectedNeighbourNode,
    lastGraphIndex,
  } = store.getState()

  const newGraphIndex = lastGraphIndex + 1

  const newCurrentGraph = `graph-${newGraphIndex}`

  const selectedNodeId = classesFromApi[selectedNeighbourNode] ? classesFromApi[selectedNeighbourNode].id : ''
  const label = `neighbourhood-${newCurrentGraph}`

  const graphValue = {
    label,
    type: ALGO_TYPE_NEIGHBOURHOOD,
    options: {
      selectedNodeId,
      separationDegree,
    },
    ...DEFAULT_GRAPH_VISUALISATION_OPTIONS
  }

  updateStoreValue(['graphData', newCurrentGraph], OPERATION_TYPE_UPDATE, graphValue)
  updateStoreValue(['currentGraph'], OPERATION_TYPE_UPDATE, newCurrentGraph)
  updateStoreValue(['lastGraphIndex'], OPERATION_TYPE_UPDATE, newGraphIndex)
  updateStoreValue(['sidebarView'], OPERATION_TYPE_UPDATE, SIDEBAR_VIEW_GRAPHS)
}

export default setNeighbourNodes
