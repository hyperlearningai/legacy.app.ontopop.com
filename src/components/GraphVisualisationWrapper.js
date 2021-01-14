import { useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import GraphVisualisation from './GraphVisualisation'
// import NodeInfo from './NodeInfo'
// import EdgeInfo from './EdgeInfo'
import SearchBox from './SearchBox'
import SettingsBox from './SettingsBox'
import ProgressBar from './ProgressBar'
import jsonClasses from '../assets/json/test-ontology-classes.json'
import jsonObjectProperties from '../assets/json/test-ontology-object-properties.json'
import actions from '../store/actions'
import setNodesIdsToDisplay from '../utils/setNodesIdsToDisplay'
import { ALGO_TYPE_FULL } from '../constants/algorithms'
import getAllTriplesPerNode from '../utils/getAllTriplesPerNode'

const GraphVisualisationWrapper = ({
  isSearchOpen,
  // isNodeSelectable,
  // selectedNodes,
  // selectedEdges,
  // isEdgeSelectable,
  isSettingsOpen,
  isNetworkLoading,
  networkLoadingProgress,
  setStoreState,
  currentGraph,
  graphData,
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
      {/* {
        isNodeSelectable
        && selectedNodes
        && selectedNodes.length > 0
        && (
          <NodeInfo />
        )
      } */}

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

      {/* {
        isEdgeSelectable
        && selectedEdges
        && selectedEdges.length > 0
        && (
          <EdgeInfo />
        )
      } */}

      {
        isSettingsOpen
        && (
          <SettingsBox />
        )
      }
    </>
  )
}

GraphVisualisationWrapper.propTypes = {
  isSearchOpen: PropTypes.bool.isRequired,
  // selectedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  // selectedEdges: PropTypes.arrayOf(PropTypes.string).isRequired,
  isSettingsOpen: PropTypes.bool.isRequired,
  isNetworkLoading: PropTypes.bool.isRequired,
  // isNodeSelectable: PropTypes.bool.isRequired,
  // isEdgeSelectable: PropTypes.bool.isRequired,
  networkLoadingProgress: PropTypes.number.isRequired,
  setStoreState: PropTypes.func.isRequired,
  currentGraph: PropTypes.string.isRequired,
  graphData: PropTypes.shape().isRequired,
}

const mapToProps = ({
  isSearchOpen,
  // selectedNodes,
  // selectedEdges,
  // isEdgeFilterOpen,
  isSettingsOpen,
  isNetworkLoading,
  networkLoadingProgress,
  // isNodeSelectable,
  // isEdgeSelectable,
  currentGraph,
  graphData
}) => ({
  isSearchOpen,
  // selectedNodes,
  // selectedEdges,
  // isEdgeFilterOpen,
  isSettingsOpen,
  isNetworkLoading,
  networkLoadingProgress,
  // isNodeSelectable,
  // isEdgeSelectable,
  currentGraph,
  graphData
})

export default connect(
  mapToProps,
  actions
)(GraphVisualisationWrapper)
