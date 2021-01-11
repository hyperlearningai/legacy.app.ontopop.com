import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import Sidebar from './Sidebar'
import GraphVisualisation from './GraphVisualisation'
import NodeInfo from './NodeInfo'
import EdgeInfo from './EdgeInfo'
import SearchBox from './SearchBox'
import SettingsBox from './SettingsBox'
import ProgressBar from './ProgressBar'

const MainView = ({
  isSidebarOpen,
  isSearchOpen,
  isNodeSelectable,
  selectedNodes,
  selectedEdges,
  isEdgeSelectable,
  isSettingsOpen,
  isNetworkLoading,
  networkLoadingProgress
}) => (
  <main className="main-view">
    {
        isSidebarOpen && (
          <Sidebar />
        )
      }

    <div className="main-view-area">
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

    </div>
  </main>
)

MainView.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  isSearchOpen: PropTypes.bool.isRequired,
  selectedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedEdges: PropTypes.arrayOf(PropTypes.string).isRequired,
  isSettingsOpen: PropTypes.bool.isRequired,
  isNetworkLoading: PropTypes.bool.isRequired,
  isNodeSelectable: PropTypes.bool.isRequired,
  isEdgeSelectable: PropTypes.bool.isRequired,
  networkLoadingProgress: PropTypes.number.isRequired,
}

const mapToProps = ({
  isSidebarOpen,
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
  isSidebarOpen,
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
  mapToProps
)(MainView)
