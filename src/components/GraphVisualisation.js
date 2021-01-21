import { useRef, useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import actions from '../store/actions'
import serialiseNodesEdges from '../utils/serialiseNodesEdges'
import setNetwork from '../utils/setNetwork'
import setNetworkMethods from '../utils/setNetworkMethods'
import getPhysicsOptions from '../utils/getPhysicsOptions'

const GraphVisualisation = ({
  availableNodes,
  availableEdges,
  addToArray,
  classesFromApi,
  edgesIdsToDisplay,
  highlightedNodes,
  network,
  nodesIdsToDisplay,
  objectPropertiesFromApi,
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength,
  // searchFilter,
  setStoreState,
  triplesPerNode,
}) => {
  const visJsRef = useRef(null)

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
  ])

  // update available nodes/edges according to view
  useEffect(() => {
    if (network) {
      setStoreState('isNetworkLoading', true)

      serialiseNodesEdges({
        nodesIdsToDisplay,
        edgesIdsToDisplay,
        classesFromApi,
        objectPropertiesFromApi,
        setStoreState,
        triplesPerNode,
        highlightedNodes,
        availableNodes,
        availableEdges,
        network,
      })
    }
  }, [
    nodesIdsToDisplay,
  ])

  // set graph options
  useEffect(() => {
    if (network) {
      network.setOptions(getPhysicsOptions({
        physicsHierarchicalView,
        physicsRepulsion,
        physicsEdgeLength
      }))
    }
  }, [
    physicsHierarchicalView,
    physicsRepulsion,
    physicsEdgeLength
  ])

  // set graph options
  useEffect(() => setNetworkMethods({
    setStoreState,
    network,
    addToArray,
    nodesIdsToDisplay
  }), [
    network,
    nodesIdsToDisplay
  ])

  // useEffect(() => {
  //   filterNodesToDisplay({
  //     classesFromApi,
  //     setStoreState,
  //     searchFilter
  //   })
  // }, [searchFilter])

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
  availableNodes: PropTypes.shape().isRequired,
  availableEdges: PropTypes.shape().isRequired,
  classesFromApi: PropTypes.shape().isRequired,
  edgesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
  highlightedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  network: PropTypes.shape(),
  nodesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
  physicsEdgeLength: PropTypes.number.isRequired,
  physicsHierarchicalView: PropTypes.bool.isRequired,
  physicsRepulsion: PropTypes.bool.isRequired,
  setStoreState: PropTypes.func.isRequired,
  triplesPerNode: PropTypes.shape().isRequired,
}

GraphVisualisation.defaultProps = {
  network: undefined,
}

const mapToProps = ({
  availableNodes,
  availableEdges,
  classesFromApi,
  deletedNodes,
  edgesIdsToDisplay,
  highlightedNodes,
  network,
  nodesIdsToDisplay,
  objectPropertiesFromApi,
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength,
  searchFilter,
  selectedEdges,
  selectedNeighbourNode,
  selectedNodes,
  triplesPerNode,

}) => ({
  availableNodes,
  availableEdges,
  classesFromApi,
  deletedNodes,
  edgesIdsToDisplay,
  highlightedNodes,
  network,
  nodesIdsToDisplay,
  objectPropertiesFromApi,
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength,
  searchFilter,
  selectedEdges,
  selectedNeighbourNode,
  selectedNodes,
  triplesPerNode,
})

export default connect(
  mapToProps,
  actions
)(GraphVisualisation)
