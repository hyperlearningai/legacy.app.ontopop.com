import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import GraphVisualisation from './GraphVisualisation'
import GraphSearch from './GraphSearch'
import DataTableNetwork from './DataTableNetwork'
import { NETWORK_VIEW_DATATABLE, SIDEBAR_VIEW_GRAPHS } from '../constants/views'

const MainArea = ({
  graphData,
  currentGraph,
  networkVisualisation,
  sidebarView
}) => (
  <div className="main-view-area-wrapper">
    {
      graphData
      && graphData[currentGraph]
      && (
        <>
          <GraphVisualisation />
          {
            (networkVisualisation === NETWORK_VIEW_DATATABLE
              && sidebarView === SIDEBAR_VIEW_GRAPHS) && (
              <DataTableNetwork />
            )
          }
        </>
      )
    }

    <GraphSearch />
  </div>
)

MainArea.propTypes = {
  graphData: PropTypes.shape().isRequired,
  currentGraph: PropTypes.string.isRequired,
  networkVisualisation: PropTypes.string.isRequired,
  sidebarView: PropTypes.string.isRequired,
}

const mapStateToProps = ({
  networkVisualisation,
  graphData,
  currentGraph,
  sidebarView
}) => ({
  networkVisualisation,
  graphData,
  currentGraph,
  sidebarView
})

export default connect(
  mapStateToProps,
)(MainArea)
