import { useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import GraphVisualisation from './GraphVisualisation'
import SearchBox from './SearchBox'
import ProgressBar from './ProgressBar'
import jsonClasses from '../assets/json/test-ontology-classes.json'
import jsonObjectProperties from '../assets/json/test-ontology-object-properties.json'
import actions from '../store/actions'
import setNodesIdsToDisplay from '../utils/setNodesIdsToDisplay'
import { ALGO_TYPE_FULL } from '../constants/algorithms'
import getAllTriplesPerNode from '../utils/getAllTriplesPerNode'

const GraphVisualisationWrapper = ({
  currentGraph,
  graphData,
  isNetworkLoading,
  isSearchOpen,
  networkLoadingProgress,
  setStoreState,
}) => {
  useEffect(async () => {
    // Set data from api
    const classesFromApi = jsonClasses.OwlClasses
    const objectPropertiesFromApi = jsonObjectProperties.OwlObjectProperties

    setStoreState('classesFromApi', classesFromApi)
    setStoreState('objectPropertiesFromApi', objectPropertiesFromApi)

    const classesIds = Object.keys(classesFromApi)
    const predicatesIds = Object.keys(objectPropertiesFromApi)

    // in the background, parse classes to get triples per node
    await getAllTriplesPerNode({
      classesIds,
      predicatesIds,
      setStoreState,
      classesFromApi
    })

    setNodesIdsToDisplay({
      type: ALGO_TYPE_FULL,
      classesFromApi,
      objectPropertiesFromApi,
      setStoreState
    })
  }, [])

  useEffect(() => {
    const classesFromApi = jsonClasses.OwlClasses
    const objectPropertiesFromApi = jsonObjectProperties.OwlObjectProperties

    // Update nodes to display based on selected graph
    const {
      type,
      options
    } = graphData[currentGraph]

    setNodesIdsToDisplay({
      type,
      classesFromApi,
      objectPropertiesFromApi,
      setStoreState,
      options
    })
  }, [currentGraph])

  return (
    <>
      {
        isSearchOpen
        && (
          <SearchBox />
        )
      }

      {
        isNetworkLoading
          ? (
            <ProgressBar
              progress={networkLoadingProgress}
            />
          ) : null
        }

      <GraphVisualisation />
    </>
  )
}

GraphVisualisationWrapper.propTypes = {
  currentGraph: PropTypes.string.isRequired,
  graphData: PropTypes.shape().isRequired,
  isSearchOpen: PropTypes.bool.isRequired,
  isNetworkLoading: PropTypes.bool.isRequired,
  networkLoadingProgress: PropTypes.number.isRequired,
  setStoreState: PropTypes.func.isRequired,
}

const mapToProps = ({
  currentGraph,
  graphData,
  isNetworkLoading,
  isSearchOpen,
  isSettingsOpen,
  networkLoadingProgress,
}) => ({
  currentGraph,
  graphData,
  isNetworkLoading,
  isSearchOpen,
  isSettingsOpen,
  networkLoadingProgress,
})

export default connect(
  mapToProps,
  actions
)(GraphVisualisationWrapper)
