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
  isPhysicsOn,
  network,
  nodesIdsToDisplay,
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength,
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
    physicsEdgeLength
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
  useEffect(() => network?.setOptions(getPhysicsOptions({
    isPhysicsOn,
    physicsHierarchicalView,
    physicsRepulsion,
    physicsEdgeLength
  })),
  [
    network,
    isPhysicsOn,
    physicsHierarchicalView,
    physicsRepulsion,
    physicsEdgeLength
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
  isPhysicsOn: PropTypes.bool.isRequired,
  network: PropTypes.shape(),
  nodesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
  physicsEdgeLength: PropTypes.number.isRequired,
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
  searchFilter,
  selectedEdges,
  selectedNeighbourNode,
  selectedNodes,
  isPhysicsOn,
}) => ({
  availableNodes,
  availableEdges,
  network,
  nodesIdsToDisplay,
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength,
  searchFilter,
  selectedEdges,
  selectedNeighbourNode,
  selectedNodes,
  isPhysicsOn,
})

export default connect(
  mapToProps,
  actions
)(GraphVisualisation)
