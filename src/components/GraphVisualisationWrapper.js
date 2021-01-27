import { useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Menu } from 'primereact/menu'
import GraphVisualisation from './GraphVisualisation'
// import jsonClasses from '../assets/json/test-ontology-classes.json'
// import jsonObjectProperties from '../assets/json/test-ontology-object-properties.json'
import actions from '../store/actions'
import setNodesIdsToDisplay from '../utils/setNodesIdsToDisplay'
import { ALGO_TYPE_FULL } from '../constants/algorithms'
import getAllTriplesPerNode from '../utils/getAllTriplesPerNode'
import getGraphData from '../utils/getGraphData'
import addNodesEdgesToGraph from '../utils/addNodesEdgesToGraph'
import { SUB_CLASS_OF_ID, SUB_CLASS_OF_LABEL } from '../constants/graph'

const GraphVisualisationWrapper = ({
  currentGraph,
  graphData,
  setStoreState,
  showContextMenu,
  contextMenuData,
  isBoundingBoxSelectable,
  boundingBoxGeometry
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
    top,
    left,
    nodeId
  } = contextMenuData

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
        <Menu
          className="context-menu"
          style={{ top, left }}
          model={[
            {
              label: t('expandNode'),
              icon: 'pi pi-fw pi-plus',
              command: () => {
                addNodesEdgesToGraph({
                  nodeId,
                  setStoreState
                })
                setStoreState('showContextMenu', false)
              }
            },
            {
              separator: true
            },
            {
              label: t('close'),
              icon: 'pi pi-fw pi-power-off',
              command: () => setStoreState('showContextMenu', false)
            }
          ]}
        />
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
  contextMenuData: PropTypes.shape().isRequired,
  boundingBoxGeometry: PropTypes.shape().isRequired,
}

const mapToProps = ({
  currentGraph,
  graphData,
  isSettingsOpen,
  showContextMenu,
  contextMenuData,
  isBoundingBoxSelectable,
  boundingBoxGeometry
}) => ({
  currentGraph,
  graphData,
  isSettingsOpen,
  showContextMenu,
  contextMenuData,
  isBoundingBoxSelectable,
  boundingBoxGeometry
})

export default connect(
  mapToProps,
  actions
)(GraphVisualisationWrapper)
