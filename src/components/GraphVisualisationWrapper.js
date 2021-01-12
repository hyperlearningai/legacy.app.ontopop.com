import { useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import GraphVisualisation from './GraphVisualisation'
import NodeInfo from './NodeInfo'
import EdgeInfo from './EdgeInfo'
import SearchBox from './SearchBox'
import SettingsBox from './SettingsBox'
import ProgressBar from './ProgressBar'
import jsonClasses from '../assets/json/test-ontology-classes.json'
import jsonObjectProperties from '../assets/json/test-ontology-object-properties.json'
import actions from '../store/actions'

const GraphVisualisationWrapper = ({
  isSearchOpen,
  isNodeSelectable,
  selectedNodes,
  selectedEdges,
  isEdgeSelectable,
  isSettingsOpen,
  isNetworkLoading,
  networkLoadingProgress,
  setStoreState
}) => {
  useEffect(() => {
    // Set data from api
    setStoreState('classesFromApi', jsonClasses.OwlClasses)
    setStoreState('nodesIdsToDisplay', Object.keys(jsonClasses.OwlClasses))
    setStoreState('objectPropertiesFromApi', jsonObjectProperties.OwlObjectProperties)
  }, [])

  return (
    <>
      {
      isNodeSelectable
      && selectedNodes
      && selectedNodes.length > 0
      && (
        <NodeInfo />
      )
    }

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

      {
          isEdgeSelectable
          && selectedEdges
          && selectedEdges.length > 0
          && (
            <EdgeInfo />
          )
        }

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
  selectedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedEdges: PropTypes.arrayOf(PropTypes.string).isRequired,
  isSettingsOpen: PropTypes.bool.isRequired,
  isNetworkLoading: PropTypes.bool.isRequired,
  isNodeSelectable: PropTypes.bool.isRequired,
  isEdgeSelectable: PropTypes.bool.isRequired,
  networkLoadingProgress: PropTypes.number.isRequired,
  setStoreState: PropTypes.func.isRequired,
}

const mapToProps = ({
  isSearchOpen,
  selectedNodes,
  selectedEdges,
  isEdgeFilterOpen,
  isSettingsOpen,
  isNetworkLoading,
  networkLoadingProgress,
  isNodeSelectable,
  isEdgeSelectable
}) => ({
  isSearchOpen,
  selectedNodes,
  selectedEdges,
  isEdgeFilterOpen,
  isSettingsOpen,
  isNetworkLoading,
  networkLoadingProgress,
  isNodeSelectable,
  isEdgeSelectable
})

export default connect(
  mapToProps,
  actions
)(GraphVisualisationWrapper)
