// import { useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import actions from '../store/actions'
import GraphVisualisation from './GraphVisualisation'
import GraphSearch from './GraphSearch'
import { SIDEBAR_VIEW_ENTRY_SEARCH } from '../constants/views'

const MainArea = ({
  graphData,
  currentGraph
}) => {
  const router = useRouter()

  const { query } = router
  const { slug } = query

  return (
    <>
      {
        graphData
        && graphData[currentGraph]
        && slug
        && slug[0] !== SIDEBAR_VIEW_ENTRY_SEARCH
          ? (
            <GraphVisualisation />
          ) : (
            <GraphSearch />
          )
      }

    </>
  )
}

MainArea.propTypes = {
  graphData: PropTypes.shape().isRequired,
  currentGraph: PropTypes.string.isRequired,
}

const mapStateToProps = ({
  graphData,
  currentGraph
}) => ({
  graphData,
  currentGraph
})

export default connect(
  mapStateToProps,
  actions
)(MainArea)
