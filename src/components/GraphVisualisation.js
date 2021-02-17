import { useEffect, useRef } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
// import jsonClasses from '../assets/json/test-ontology-classes.json'
// import jsonObjectProperties from '../assets/json/test-ontology-object-properties.json'
import actions from '../store/actions'
import setNodesIdsToDisplay from '../utils/setNodesIdsToDisplay'
import GraphContextMenu from './GraphContextMenu'
import startupActions from '../utils/graphVisualisation/startupActions'
import setNetwork from '../utils/setNetwork'
import setNetworkMethods from '../utils/setNetworkMethods'
import getPhysicsOptions from '../utils/getPhysicsOptions'
import addElementsToGraph from '../utils/graphVisualisation/addElementsToGraph'

const GraphVisualisation = ({
  currentGraph,
  graphData,
  setStoreState,
  showContextMenu,
  isBoundingBoxSelectable,
  boundingBoxGeometry,
  addToObject,
  availableNodes,
  availableEdges,
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
  stylingEdgeTextColor,
  stylingEdgeTextSize,
  stylingEdgeTextAlign,
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
}) => {
  const { t } = useTranslation()
  const isInitialMountCurrentGraph = useRef(true)

  const visJsRef = useRef(null)

  useEffect(() => startupActions({
    setStoreState,
    addToObject,
    t
  }), [])

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

      addElementsToGraph({
        setStoreState,
      })
    }
  }, [
    nodesIdsToDisplay,
  ])

  useEffect(() => {
    if (isInitialMountCurrentGraph.current) {
      isInitialMountCurrentGraph.current = false
    } else {
      const {
        type,
        options
      } = graphData[currentGraph]

      setNodesIdsToDisplay({
        type,
        setStoreState,
        options
      })
    }
  }, [
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
    stylingEdgeLength,
    stylingEdgeWidth,
    stylingEdgeLineStyle,
    stylingEdgeLineColor,
    stylingEdgeLineColorHover,
    stylingEdgeLineColorHighlight,
    stylingEdgeLength,
    stylingEdgeWidth,
    stylingEdgeLineStyle,
    stylingEdgeLineColor,
    stylingEdgeLineColorHover,
    stylingEdgeLineColorHighlight,
    stylingEdgeTextColor,
    stylingEdgeTextSize,
    stylingEdgeTextAlign,
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
  graphData: PropTypes.shape().isRequired,
  setStoreState: PropTypes.func.isRequired,
  showContextMenu: PropTypes.bool.isRequired,
  isBoundingBoxSelectable: PropTypes.bool.isRequired,
  boundingBoxGeometry: PropTypes.shape().isRequired,
  addToObject: PropTypes.func.isRequired,
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
  stylingNodeTextFontAlign: PropTypes.string.isRequired,
  stylingEdgeTextColor: PropTypes.string.isRequired,
  stylingEdgeTextSize: PropTypes.number.isRequired,
  stylingEdgeTextAlign: PropTypes.string.isRequired,
}

GraphVisualisation.defaultProps = {
  network: undefined,
}

const mapToProps = ({
  currentGraph,
  graphData,
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
  selectedNeighbourNode,
  selectedNodes,
  isPhysicsOn,
  stylingNodeHoverBackgroundColor,
  stylingNodeHoverBorderColor,
  stylingNodeTextFontSize,
  stylingNodeTextFontAlign,
  stylingEdgeTextColor,
  stylingEdgeTextSize,
  stylingEdgeTextAlign,
}) => ({
  currentGraph,
  graphData,
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
  selectedNeighbourNode,
  selectedNodes,
  isPhysicsOn,
  stylingNodeHoverBackgroundColor,
  stylingNodeHoverBorderColor,
  stylingNodeTextFontSize,
  stylingNodeTextFontAlign,
  stylingEdgeTextColor,
  stylingEdgeTextSize,
  stylingEdgeTextAlign,
})

export default connect(
  mapToProps,
  actions
)(GraphVisualisation)
