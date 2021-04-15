import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import GraphVisualisation from './GraphVisualisation'
import GraphSearch from './GraphSearch'

const MainArea = ({
  graphData,
  currentGraph,
}) => (
  <div className="main-view-area-wrapper">
    {
      graphData
      && graphData[currentGraph]
      && (
        <GraphVisualisation />
      )
    }

    <GraphSearch />
  </div>
)

MainArea.propTypes = {
  graphData: PropTypes.shape().isRequired,
  currentGraph: PropTypes.string.isRequired
}

const mapStateToProps = ({
  graphData,
  currentGraph,
}) => ({
  graphData,
  currentGraph,
})

export default connect(
  mapStateToProps,
)(MainArea)
