import { useEffect, useRef } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import actions from '../store/actions'
import setNodesIdsToDisplay from '../utils/graphVisualisation/setNodesIdsToDisplay'
import GraphContextMenu from './GraphContextMenu'
import setNetwork from '../utils/graphVisualisation/setNetwork'
import setNetworkMethods from '../utils/graphVisualisation/setNetworkMethods'
import getPhysicsOptions from '../utils/graphVisualisation/getPhysicsOptions'
import queueGraphElements from '../utils/graphVisualisation/queueGraphElements'

const GraphVisualisation = ({
  currentGraph,
  setStoreState,
  showContextMenu,
  isBoundingBoxSelectable,
  boundingBoxGeometry,
  availableNodes,
  availableEdges,
  network,
  nodesIdsToDisplay,
  removeFromObject,
  physicsHierarchicalView,
  physicsRepulsion,
  isPhysicsOn,
  globalEdgeStyling,
  toggleFromArrayInKey,
  addNumber,
  addSubValueToObject
}) => {
  const { t } = useTranslation()
  const isInitialMountCurrentGraph = useRef(true)

  const visJsRef = useRef(null)

  // set new Network
  useEffect(() => setNetwork({
    setStoreState,
    visJsRef,
    availableNodes,
    availableEdges,
  }), [
    visJsRef,
  ])

  // update available nodes/edges according to view
  useEffect(() => {
    if (isInitialMountCurrentGraph.current) {
      isInitialMountCurrentGraph.current = false
    } else if (nodesIdsToDisplay.length > 0) {
      setStoreState('isNetworkLoading', true)

      queueGraphElements({
        setStoreState,
        addNumber,
        toggleFromArrayInKey,
        addSubValueToObject
      })
    }
  }, [
    nodesIdsToDisplay,
  ])

  useEffect(() => setNodesIdsToDisplay({
    setStoreState,
    removeFromObject,
    t
  }),
  [
    currentGraph
  ])

  // set graph options
  useEffect(() => {
    if (network) {
      network.setOptions(getPhysicsOptions())
    }
  }, [
    isPhysicsOn,
    physicsHierarchicalView,
    physicsRepulsion,
    globalEdgeStyling.stylingEdgeLength
  ])

  // // set graph options
  useEffect(() => setNetworkMethods({
    setStoreState,
    network,
    addNumber,
    toggleFromArrayInKey
  }), [
    network,
    nodesIdsToDisplay
  ])

  const {
    boundingBoxPosX,
    boundingBoxPosY,
    boundingBoxWidth,
    boundingBoxHeight
  } = boundingBoxGeometry

  return (
    <div className="graph-container">
      <div
        id="network-graph"
        ref={visJsRef}
        style={{
          height: '100%',
          width: '100%'
        }}
      />

      {
        isBoundingBoxSelectable
        && (
          <div
            style={{
              top: boundingBoxPosY,
              left: boundingBoxPosX,
              width: boundingBoxWidth,
              height: boundingBoxHeight
            }}
            className="bounding-box-wrapper"
          />
        )
      }

      {
        showContextMenu
        && (
          <GraphContextMenu />
        )
      }
    </div>
  )
}

GraphVisualisation.propTypes = {
  currentGraph: PropTypes.string.isRequired,
  setStoreState: PropTypes.func.isRequired,
  showContextMenu: PropTypes.bool.isRequired,
  isBoundingBoxSelectable: PropTypes.bool.isRequired,
  boundingBoxGeometry: PropTypes.shape().isRequired,
  removeFromObject: PropTypes.func.isRequired,
  availableNodes: PropTypes.shape().isRequired,
  availableEdges: PropTypes.shape().isRequired,
  isPhysicsOn: PropTypes.bool.isRequired,
  network: PropTypes.shape(),
  nodesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
  physicsHierarchicalView: PropTypes.bool.isRequired,
  physicsRepulsion: PropTypes.bool.isRequired,
  globalEdgeStyling: PropTypes.shape().isRequired,
  addNumber: PropTypes.func.isRequired,
  toggleFromArrayInKey: PropTypes.func.isRequired,
  addSubValueToObject: PropTypes.func.isRequired,
}

GraphVisualisation.defaultProps = {
  network: undefined,
}

const mapToProps = ({
  currentGraph,
  showContextMenu,
  contextMenuData,
  isBoundingBoxSelectable,
  boundingBoxGeometry,
  availableNodes,
  availableEdges,
  network,
  nodesIdsToDisplay,
  physicsHierarchicalView,
  physicsRepulsion,
  selectedNeighbourNode,
  selectedNodes,
  isPhysicsOn,
  globalEdgeStyling
}) => ({
  currentGraph,
  showContextMenu,
  contextMenuData,
  isBoundingBoxSelectable,
  boundingBoxGeometry,
  availableNodes,
  availableEdges,
  network,
  nodesIdsToDisplay,
  physicsHierarchicalView,
  physicsRepulsion,
  selectedNeighbourNode,
  selectedNodes,
  isPhysicsOn,
  globalEdgeStyling
})

export default connect(
  mapToProps,
  actions
)(GraphVisualisation)
