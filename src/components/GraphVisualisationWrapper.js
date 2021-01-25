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

const GraphVisualisationWrapper = ({
  currentGraph,
  graphData,
  setStoreState,
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

  return (
    <GraphVisualisation />
  )
}

GraphVisualisationWrapper.propTypes = {
  currentGraph: PropTypes.string.isRequired,
  graphData: PropTypes.shape().isRequired,
  setStoreState: PropTypes.func.isRequired,
}

const mapToProps = ({
  currentGraph,
  graphData,
  isSettingsOpen,
}) => ({
  currentGraph,
  graphData,
  isSettingsOpen,
})

export default connect(
  mapToProps,
  actions
)(GraphVisualisationWrapper)
