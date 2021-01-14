import { useRef, useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import actions from '../store/actions'
import serialiseNodesEdges from '../utils/serialiseNodesEdges'
import setNetwork from '../utils/setNetwork'
import setNetworkMethods from '../utils/setNetworkMethods'
import { ALGO_TYPE_NEIGHBOURHOOD } from '../constants/algorithms'
// import filterNodesToDisplay from '../utils/filterNodesToDisplay'

const GraphVisualisation = ({
  availableNodes,
  availableEdges,
  // searchFilter,
  setStoreState,
  addToArray,
  classesFromApi,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  edgesIdsToDisplay,
  // edgesToIgnore,
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength,
  triplesPerNode,
  // deletedNodes,
  isNodeSelectable,
  network,
  selectedNodes,
  // selectedEdges,
  isEdgeSelectable,
  isNeighbourNodeSelectable,
  selectedNeighbourNode,
  currentGraph,
  graphData,
  highlightedNodes
}) => {
  const visJsRef = useRef(null)

  // update available nodes/edges according to view
  useEffect(() => serialiseNodesEdges({
    nodesIdsToDisplay,
    edgesIdsToDisplay,
    classesFromApi,
    objectPropertiesFromApi,
    setStoreState,
    triplesPerNode,
    highlightedNodes
    // edgesToIgnore,
    // deletedNodes
  }), [
    nodesIdsToDisplay,
    // edgesToIgnore,
    // deletedNodes
  ])

  // set new Network
  useEffect(() => setNetwork({
    setStoreState,
    visJsRef,
    availableNodes,
    availableEdges,
    physicsHierarchicalView,
    physicsRepulsion,
    physicsEdgeLength
  }), [
    visJsRef,
    availableNodes,
    availableEdges,
    physicsHierarchicalView,
    physicsRepulsion,
    physicsEdgeLength
  ])

  // set network methods
  useEffect(() => setNetworkMethods({
    setStoreState,
    network,
    addToArray,
    isNodeSelectable,
    isEdgeSelectable,
    nodesIdsToDisplay,
    isNeighbourNodeSelectable
  }), [
    network,
    isNodeSelectable,
    isEdgeSelectable,
    isNeighbourNodeSelectable
  ])

  // useEffect(() => {
  //   filterNodesToDisplay({
  //     classesFromApi,
  //     setStoreState,
  //     searchFilter
  //   })
  // }, [searchFilter])

  useEffect(() => {
    const availableNodesIds = availableNodes.map((node) => node.id)

    const nodesToAdd = selectedNodes.filter((node) => availableNodesIds.includes(node))

    network?.selectNodes(nodesToAdd)
  }, [
    selectedNodes
  ])

  useEffect(() => {
    if (graphData[currentGraph].type === ALGO_TYPE_NEIGHBOURHOOD) {
      if (selectedNeighbourNode !== '') {
        network?.selectNodes([selectedNeighbourNode])
      } else {
        network?.selectNodes([])
      }
    }
  }, [
    selectedNeighbourNode,
    currentGraph
  ])

  // useEffect(() => {
  //   const availableEdgesIds = availableEdges.map((edge) => edge.id)

  //   const edgesToAdd = selectedEdges.filter((edge) => availableEdgesIds.includes(edge))

  //   network?.selectEdges(edgesToAdd)
  // }, [
  //   selectedEdges
  // ])

  return (
    <div
      id="network-graph"
      ref={visJsRef}
      style={{
        height: '100%',
        width: '100%'
      }}
    />
  )
}

GraphVisualisation.propTypes = {
  addToArray: PropTypes.func.isRequired,
  availableNodes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  availableEdges: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  classesFromApi: PropTypes.shape().isRequired,
  currentGraph: PropTypes.string.isRequired,
  // deletedNodes,
  // edgesToIgnore,
  edgesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
  graphData: PropTypes.shape().isRequired,
  highlightedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  isEdgeSelectable: PropTypes.bool.isRequired,
  isNeighbourNodeSelectable: PropTypes.bool.isRequired,
  isNodeSelectable: PropTypes.bool.isRequired,
  network: PropTypes.shape(),
  nodesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
  physicsEdgeLength: PropTypes.number.isRequired,
  physicsHierarchicalView: PropTypes.bool.isRequired,
  physicsRepulsion: PropTypes.bool.isRequired,
  // searchFilter: PropTypes.string.isRequired,
  selectedNeighbourNode: PropTypes.string.isRequired,
  selectedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  setStoreState: PropTypes.func.isRequired,
  triplesPerNode: PropTypes.shape().isRequired,
  // selectedEdges,
}

GraphVisualisation.defaultProps = {
  network: undefined,
}

const mapToProps = ({
  availableNodes,
  availableEdges,
  searchFilter,
  classesFromApi,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  // edgesToIgnore,
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength,
  deletedNodes,
  isNodeSelectable,
  network,
  selectedNodes,
  isEdgeSelectable,
  selectedEdges,
  triplesPerNode,
  isNeighbourNodeSelectable,
  selectedNeighbourNode,
  currentGraph,
  graphData,
  edgesIdsToDisplay,
  highlightedNodes
}) => ({
  availableNodes,
  availableEdges,
  searchFilter,
  classesFromApi,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  // edgesToIgnore,
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength,
  deletedNodes,
  isNodeSelectable,
  network,
  selectedNodes,
  isEdgeSelectable,
  selectedEdges,
  triplesPerNode,
  isNeighbourNodeSelectable,
  selectedNeighbourNode,
  currentGraph,
  graphData,
  edgesIdsToDisplay,
  highlightedNodes
})

export default connect(
  mapToProps,
  actions
)(GraphVisualisation)
