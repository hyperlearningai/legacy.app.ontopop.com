import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import actions from '../store/actions'
import GraphVisualisation from './GraphVisualisation'
import GraphSearch from './GraphSearch'
import { SIDEBAR_VIEW_ENTRY_SEARCH } from '../constants/views'

const MainArea = ({
  graphData,
  currentGraph,
  sidebarView
}) => (
  <>
    {
        graphData
        && graphData[currentGraph]
        && sidebarView !== SIDEBAR_VIEW_ENTRY_SEARCH
          ? (
            <GraphVisualisation />
          ) : (
            <GraphSearch />
          )
      }

  </>
)

MainArea.propTypes = {
  graphData: PropTypes.shape().isRequired,
  currentGraph: PropTypes.string.isRequired,
  sidebarView: PropTypes.string.isRequired,
}

const mapStateToProps = ({
  graphData,
  currentGraph,
  sidebarView
}) => ({
  graphData,
  currentGraph,
  sidebarView
})

export default connect(
  mapStateToProps,
  actions
)(MainArea)
