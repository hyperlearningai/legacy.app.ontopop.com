import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import Sidebar from './Sidebar'
import GraphVisualisation from './GraphVisualisation'
import ElementInfo from './ElementInfo'
import SearchBox from './SearchBox'
import SettingsBox from './SettingsBox'
import EdgeFilter from './EdgeFilter'
import ProgressBar from './ProgressBar'

const MainView = ({
  isSidebarOpen,
  isSearchOpen,
  isInfoOpen,
  selectedNodes,
  isEdgeFilterOpen,
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
        isInfoOpen
        && selectedNodes
        && selectedNodes.length > 0
        && (
          <ElementInfo />
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
        isEdgeFilterOpen
        && (
          <EdgeFilter />
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
  isInfoOpen: PropTypes.bool.isRequired,
  selectedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  isEdgeFilterOpen: PropTypes.bool.isRequired,
  isSettingsOpen: PropTypes.bool.isRequired,
  isNetworkLoading: PropTypes.bool.isRequired,
  networkLoadingProgress: PropTypes.number.isRequired,
}

const mapToProps = ({
  isSidebarOpen,
  isInfoOpen,
  isSearchOpen,
  selectedNodes,
  isEdgeFilterOpen,
  isSettingsOpen,
  isNetworkLoading,
  networkLoadingProgress
}) => ({
  isSidebarOpen,
  isInfoOpen,
  isSearchOpen,
  selectedNodes,
  isEdgeFilterOpen,
  isSettingsOpen,
  isNetworkLoading,
  networkLoadingProgress
})

export default connect(
  mapToProps
)(MainView)
