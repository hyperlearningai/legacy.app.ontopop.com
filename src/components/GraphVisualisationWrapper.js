import { useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import GraphVisualisation from './GraphVisualisation'
// import jsonClasses from '../assets/json/test-ontology-classes.json'
// import jsonObjectProperties from '../assets/json/test-ontology-object-properties.json'
import actions from '../store/actions'
import setNodesIdsToDisplay from '../utils/setNodesIdsToDisplay'
import { ALGO_TYPE_FULL } from '../constants/algorithms'
import getAllTriplesPerNode from '../utils/getAllTriplesPerNode'
import getGraphData from '../utils/getGraphData'
import { SUB_CLASS_OF_ID, SUB_CLASS_OF_LABEL } from '../constants/graph'
import GraphContextMenu from './GraphContextMenu'

const GraphVisualisationWrapper = ({
  currentGraph,
  graphData,
  setStoreState,
  showContextMenu,
  isBoundingBoxSelectable,
  boundingBoxGeometry,
  addToObject
}) => {
  const { t } = useTranslation()

  useEffect(async () => {
    const { classes, objectProperties } = await getGraphData({
      setStoreState,
      t
    })

    // Set data from local file for debugging
    // const classesFromApi = jsonClasses.OwlClasses
    // const objectPropertiesFromApi = jsonObjectProperties.OwlObjectProperties

    // add subClassOf to avoid missing links between nodes
    objectProperties[SUB_CLASS_OF_ID] = {
      rdfAbout: SUB_CLASS_OF_ID,
      rdfsLabel: SUB_CLASS_OF_LABEL
    }

    setStoreState('classesFromApi', classes)
    setStoreState('objectPropertiesFromApi', objectProperties)
    addToObject('graphVersions', 'original', {
      classesFromApi: classes,
      objectPropertiesFromApi: objectProperties
    })

    const classesIds = Object.keys(classes)
    const predicatesIds = Object.keys(objectProperties)

    // in the background, parse classes to get triples per node
    await getAllTriplesPerNode({
      classesIds,
      predicatesIds,
      setStoreState,
      classesFromApi: classes
    })

    setNodesIdsToDisplay({
      type: ALGO_TYPE_FULL,
      classesFromApi: classes,
      objectPropertiesFromApi: objectProperties,
      setStoreState
    })
  }, [])

  useEffect(() => {
    // Update nodes to display based on selected graph
    const {
      type,
      options
    } = graphData[currentGraph]

    setNodesIdsToDisplay({
      type,
      setStoreState,
      options
    })
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
}

const mapToProps = ({
  currentGraph,
  graphData,
  showContextMenu,
  contextMenuData,
  isBoundingBoxSelectable,
  boundingBoxGeometry
}) => ({
  currentGraph,
  graphData,
  showContextMenu,
  contextMenuData,
  isBoundingBoxSelectable,
  boundingBoxGeometry
})

export default connect(
  mapToProps,
  actions
)(GraphVisualisationWrapper)
