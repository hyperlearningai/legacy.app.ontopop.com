import { useRef, useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import actions from '../store/actions'
import serialiseNodesEdges from '../utils/serialiseNodesEdges'
import setNetwork from '../utils/setNetwork'
// import filterNodesToDisplay from '../utils/filterNodesToDisplay'

const GraphVisualisation = ({
  availableNodes,
  availableEdges,
  // searchFilter,
  setStoreState,
  // addToArray,
  classesFromApi,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  // edgesToIgnore,
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength,
  // deletedNodes,
  // isNodeSelectable,
  // network,
  // selectedNodes,
  // selectedEdges,
  // isEdgeSelectable
}) => {
  const visJsRef = useRef(null)

  // update available nodes/edges according to view
  useEffect(() => serialiseNodesEdges({
    nodesIdsToDisplay,
    classesFromApi,
    objectPropertiesFromApi,
    setStoreState,
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

  // useEffect(() => {
  //   filterNodesToDisplay({
  //     classesFromApi,
  //     setStoreState,
  //     searchFilter
  //   })
  // }, [searchFilter])

  // useEffect(async () => {
  //   network?.on('selectNode', (event) => {
  //     if (event.nodes?.length === 1) {
  //       if (isNodeSelectable) {
  //         addToArray('selectedNodes', event.nodes[0])
  //       }

  //       if (!nodesIdsToDisplay.includes(event.nodes[0])) {
  //         const newNodesIdsToDisplay = [
  //           ...nodesIdsToDisplay,
  //           event.nodes[0]
  //         ]

  //         setStoreState('nodesIdsToDisplay', newNodesIdsToDisplay)
  //       }
  //     }
  //   })

  //   network?.on('selectEdge', (event) => {
  //     if (event.edges?.length === 1) {
  //       if (isEdgeSelectable) {
  //         addToArray('selectedEdges', event.edges[0])
  //       }
  //     }
  //   })

  //   network?.on('stabilizationProgress', (params) => {
  //     const percentage = parseFloat(params.iterations / params.total).toFixed(2)

  //     setStoreState('networkLoadingProgress', percentage * 100)
  //   })

  //   network?.once('stabilizationIterationsDone', () => {
  //     setStoreState('networkLoadingProgress', 0)
  //     setStoreState('isNetworkLoading', false)
  //   })

  //   await network?.stabilize(2000)

  //   network?.fit()
  // }, [
  //   network,
  //   isNodeSelectable,
  //   isEdgeSelectable
  // ])

  // useEffect(() => {
  //   const availableNodesIds = availableNodes.map((node) => node.id)

  //   const nodesToAdd = selectedNodes.filter((node) => availableNodesIds.includes(node))

  //   network?.selectNodes(nodesToAdd)
  // }, [
  //   selectedNodes
  // ])

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
  availableNodes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  availableEdges: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  // searchFilter: PropTypes.string.isRequired,
  setStoreState: PropTypes.func.isRequired,
  // addToArray: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  classesFromApi: PropTypes.shape().isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
  nodesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
  // edgesToIgnore,
  physicsHierarchicalView: PropTypes.bool.isRequired,
  physicsRepulsion: PropTypes.bool.isRequired,
  physicsEdgeLength: PropTypes.number.isRequired,
  // deletedNodes,
  // isNodeSelectable,
  // network,
  // selectedNodes,
  // selectedEdges,
  // isEdgeSelectable
}

// GraphVisualisation.defaultProps = {
//   network: undefined,
// }

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
  selectedEdges
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
  selectedEdges
})

export default connect(
  mapToProps,
  actions
)(GraphVisualisation)
