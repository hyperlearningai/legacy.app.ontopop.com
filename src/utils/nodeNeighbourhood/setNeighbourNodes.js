import { ALGO_TYPE_NEIGHBOURHOOD } from '../../constants/algorithms'
import { DEFAULT_GRAPH_VISUALISATION_OPTIONS } from '../../constants/graph'
import { SIDEBAR_VIEW_GRAPHS } from '../../constants/views'
import store from '../../store'

/**
 * Set neighbout nodes
 * @param  {Object}   params
 * @param  {Number}   params.separationDegree          Separation degree integer
 * @param  {Function} params.setStoreState             setStoreState action
 * @param  {Function} params.addToObject           Add to object action
 * @return { undefined }
 */
const setNeighbourNodes = ({
  separationDegree,
  setStoreState,
  addToObject
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

  addToObject('graphData', newCurrentGraph, graphValue)
  setStoreState('currentGraph', newCurrentGraph)
  setStoreState('lastGraphIndex', newGraphIndex)
  setStoreState('sidebarView', SIDEBAR_VIEW_GRAPHS)
}

export default setNeighbourNodes
