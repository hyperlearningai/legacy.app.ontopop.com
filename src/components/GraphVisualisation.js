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
  isPhysicsOn,
  stylingEdgeLength,
  stylingEdgeWidth,
  stylingEdgeLineStyle,
  stylingEdgeLineColor,
  stylingEdgeLineColorHover,
  stylingEdgeLineColorHighlight,
  stylingNodeShape,
  stylingNodeSize,
  stylingNodeBorder,
  stylingNodeBorderSelected,
  stylingNodeBorderColor,
  stylingNodeBackgroundColor,
  stylingNodeHighlightBorderColor,
  stylingNodeHighlightBackgroundColor,
  stylingNodeTextColor,
  stylingNodeHoverBackgroundColor,
  stylingNodeHoverBorderColor,
  stylingNodeTextFontSize,
  stylingNodeTextFontAlign,
  setStoreState
}) => {
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
      network.setOptions(getPhysicsOptions())
    }
  }, [
    isPhysicsOn,
    physicsHierarchicalView,
    physicsRepulsion,
    stylingEdgeLength,
    stylingEdgeWidth,
    stylingEdgeLineStyle,
    stylingEdgeLineColor,
    stylingEdgeLineColorHover,
    stylingEdgeLineColorHighlight,
    stylingNodeShape,
    stylingNodeSize,
    stylingNodeBorder,
    stylingNodeBorderSelected,
    stylingNodeBorderColor,
    stylingNodeBackgroundColor,
    stylingNodeHighlightBorderColor,
    stylingNodeHighlightBackgroundColor,
    stylingNodeTextColor,
    stylingNodeHoverBackgroundColor,
    stylingNodeHoverBorderColor,
    stylingNodeTextFontSize,
    stylingNodeTextFontAlign
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
  stylingEdgeLength: PropTypes.number.isRequired,
  stylingEdgeWidth: PropTypes.number.isRequired,
  stylingEdgeLineStyle: PropTypes.bool.isRequired,
  stylingEdgeLineColor: PropTypes.string.isRequired,
  stylingEdgeLineColorHover: PropTypes.string.isRequired,
  stylingEdgeLineColorHighlight: PropTypes.string.isRequired,
  stylingNodeShape: PropTypes.string.isRequired,
  stylingNodeBorderColor: PropTypes.string.isRequired,
  stylingNodeBackgroundColor: PropTypes.string.isRequired,
  stylingNodeHighlightBorderColor: PropTypes.string.isRequired,
  stylingNodeHighlightBackgroundColor: PropTypes.string.isRequired,
  stylingNodeTextColor: PropTypes.string.isRequired,
  stylingNodeSize: PropTypes.number.isRequired,
  stylingNodeBorder: PropTypes.number.isRequired,
  stylingNodeBorderSelected: PropTypes.number.isRequired,
  stylingNodeTextFontSize: PropTypes.number.isRequired,
  stylingNodeHoverBackgroundColor: PropTypes.string.isRequired,
  stylingNodeHoverBorderColor: PropTypes.string.isRequired,
  physicsHierarchicalView: PropTypes.bool.isRequired,
  physicsRepulsion: PropTypes.bool.isRequired,
  setStoreState: PropTypes.func.isRequired,
  stylingNodeTextFontAlign: PropTypes.string.isRequired,
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
  stylingEdgeLength,
  stylingEdgeWidth,
  stylingEdgeLineStyle,
  stylingEdgeLineColor,
  stylingEdgeLineColorHover,
  stylingEdgeLineColorHighlight,
  stylingNodeShape,
  stylingNodeSize,
  stylingNodeBorder,
  stylingNodeBorderSelected,
  stylingNodeBorderColor,
  stylingNodeBackgroundColor,
  stylingNodeHighlightBorderColor,
  stylingNodeHighlightBackgroundColor,
  stylingNodeTextColor,
  searchFilter,
  selectedEdges,
  selectedNeighbourNode,
  selectedNodes,
  isPhysicsOn,
  stylingNodeHoverBackgroundColor,
  stylingNodeHoverBorderColor,
  stylingNodeTextFontSize,
  stylingNodeTextFontAlign
}) => ({
  availableNodes,
  availableEdges,
  network,
  nodesIdsToDisplay,
  physicsHierarchicalView,
  physicsRepulsion,
  stylingEdgeLength,
  stylingEdgeWidth,
  stylingEdgeLineStyle,
  stylingEdgeLineColor,
  stylingEdgeLineColorHover,
  stylingEdgeLineColorHighlight,
  stylingNodeShape,
  stylingNodeSize,
  stylingNodeBorder,
  stylingNodeBorderSelected,
  stylingNodeBorderColor,
  stylingNodeBackgroundColor,
  stylingNodeHighlightBorderColor,
  stylingNodeHighlightBackgroundColor,
  stylingNodeTextColor,
  searchFilter,
  selectedEdges,
  selectedNeighbourNode,
  selectedNodes,
  isPhysicsOn,
  stylingNodeHoverBackgroundColor,
  stylingNodeHoverBorderColor,
  stylingNodeTextFontSize,
  stylingNodeTextFontAlign
})

export default connect(
  mapToProps,
  actions
)(GraphVisualisation)
