import { useEffect, useRef } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import GraphVisualisation from './GraphVisualisation'
// import jsonClasses from '../assets/json/test-ontology-classes.json'
// import jsonObjectProperties from '../assets/json/test-ontology-object-properties.json'
import actions from '../store/actions'
import setNodesIdsToDisplay from '../utils/setNodesIdsToDisplay'
import setGraphData from '../utils/setGraphData'
import getGraphData from '../utils/getGraphData'
import getNodeProperties from '../utils/getNodeProperties'
import { GRAPH_VERSION_STRUCTURE, SUB_CLASS_OF_ID, SUB_CLASS_OF_LABEL } from '../constants/graph'
import GraphContextMenu from './GraphContextMenu'
import loadGraphVersionFromServer from '../utils/versioning/loadGraphVersionFromServer'
import getEdgeProperties from '../utils/getEdgeProperties'

const GraphVisualisationWrapper = ({
  currentGraph,
  graphData,
  setStoreState,
  showContextMenu,
  isBoundingBoxSelectable,
  boundingBoxGeometry,
  addToObject,
  selectedGraphVersion
}) => {
  const { t } = useTranslation()
  const isInitialMountSelectedGraphVersion = useRef(true)
  const isInitialMountCurrentGraph = useRef(true)

  useEffect(async () => {
    const { classes, objectProperties } = await getGraphData({
      setStoreState,
      t
    })

    // get nodes properties
    const annotationProperties = await getNodeProperties({
      setStoreState,
      t
    })

    setStoreState('annotationProperties', annotationProperties)

    // get edges properties for editing ontology connections
    const edgesProperties = await getEdgeProperties({
      setStoreState,
      t
    })

    setStoreState('edgesProperties', edgesProperties)

    // TODO: Should become async when API call instead of localstorage
    loadGraphVersionFromServer({
      setStoreState,
      addToObject,
      classes,
      objectProperties
    })

    // Set data from local file for debugging
    // const classesFromApi = jsonClasses.OwlClasses
    // const objectPropertiesFromApi = jsonObjectProperties.OwlObjectProperties

    // add subClassOf to avoid missing links between nodes
    objectProperties[SUB_CLASS_OF_ID] = {
      rdfAbout: SUB_CLASS_OF_ID,
      rdfsLabel: SUB_CLASS_OF_LABEL
    }

    addToObject('graphVersions', 'original', {
      ...GRAPH_VERSION_STRUCTURE,
      classesFromApi: classes,
      objectPropertiesFromApi: objectProperties,
      classesFromApiBackup: classes,
      objectPropertiesFromApiBackup: objectProperties,
    })

    setGraphData({
      setStoreState,
    })
  }, [])

  // Update nodes to display based on graph version except at component mount
  useEffect(() => {
    if (isInitialMountSelectedGraphVersion.current) {
      isInitialMountSelectedGraphVersion.current = false
    } else {
      setGraphData({
        setStoreState
      })
    }
  },
  [
    selectedGraphVersion
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

  const {
    boundingBoxPosX,
    boundingBoxPosY,
    boundingBoxWidth,
    boundingBoxHeight
  } = boundingBoxGeometry

  return (
    <div className="graph-container">
      <GraphVisualisation />

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

GraphVisualisationWrapper.propTypes = {
  currentGraph: PropTypes.string.isRequired,
  graphData: PropTypes.shape().isRequired,
  setStoreState: PropTypes.func.isRequired,
  showContextMenu: PropTypes.bool.isRequired,
  isBoundingBoxSelectable: PropTypes.bool.isRequired,
  boundingBoxGeometry: PropTypes.shape().isRequired,
  addToObject: PropTypes.func.isRequired,
  selectedGraphVersion: PropTypes.string.isRequired,
}

const mapToProps = ({
  currentGraph,
  graphData,
  showContextMenu,
  contextMenuData,
  isBoundingBoxSelectable,
  boundingBoxGeometry,
  selectedGraphVersion,
}) => ({
  currentGraph,
  graphData,
  showContextMenu,
  contextMenuData,
  isBoundingBoxSelectable,
  boundingBoxGeometry,
  selectedGraphVersion,
})

export default connect(
  mapToProps,
  actions
)(GraphVisualisationWrapper)
