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
  network,
  nodesIdsToDisplay,
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength,
  physicsEdgeWidth,
  setStoreState,
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
    physicsEdgeLength,
    physicsEdgeWidth
  }), [
    visJsRef,
  ])

  // update available nodes/edges according to view
  useEffect(() => {
    if (network) {
      setStoreState('isNetworkLoading', true)

      serialiseNodesEdges({
        setStoreState,
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
        physicsEdgeLength,
        physicsEdgeWidth
      }))
    }
  }, [
    physicsHierarchicalView,
    physicsRepulsion,
    physicsEdgeLength,
    physicsEdgeWidth
  ])

  // set graph options
  useEffect(() => setNetworkMethods({
    setStoreState,
    network,
    addToArray,
  }), [
    network,
    nodesIdsToDisplay
  ])

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
  network: PropTypes.shape(),
  nodesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
  physicsEdgeLength: PropTypes.number.isRequired,
  physicsEdgeWidth: PropTypes.number.isRequired,
  physicsHierarchicalView: PropTypes.bool.isRequired,
  physicsRepulsion: PropTypes.bool.isRequired,
  setStoreState: PropTypes.func.isRequired,
}

GraphVisualisation.defaultProps = {
  network: undefined,
}

const mapToProps = ({
  availableNodes,
  availableEdges,
  network,
  nodesIdsToDisplay,
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength,
  physicsEdgeWidth,
  searchFilter,
  selectedEdges,
  selectedNeighbourNode,
  selectedNodes,
}) => ({
  availableNodes,
  availableEdges,
  network,
  nodesIdsToDisplay,
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength,
  physicsEdgeWidth,
  searchFilter,
  selectedEdges,
  selectedNeighbourNode,
  selectedNodes,
})

export default connect(
  mapToProps,
  actions
)(GraphVisualisation)
