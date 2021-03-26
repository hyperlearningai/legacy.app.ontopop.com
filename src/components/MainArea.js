import { useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import actions from '../store/actions'
import GraphVisualisation from './GraphVisualisation'
import GraphSearch from './GraphSearch'
import { MAIN_VIEW_GRAPH, MAIN_VIEW_SEARCH } from '../constants/views'
import startupActions from '../utils/graphVisualisation/startupActions'

const MainArea = ({
  updateStoreValue,
  mainVisualisation,
}) => {
  const { t } = useTranslation()

  useEffect(() => startupActions({
    updateStoreValue,
    t
  }),
  [])

  return (
    <>
      {
        mainVisualisation === MAIN_VIEW_SEARCH
        && (
          <GraphSearch />
        )
      }

      {
        mainVisualisation === MAIN_VIEW_GRAPH
        && (
          <GraphVisualisation />
        )
      }
    </>
  )
}

MainArea.propTypes = {
  updateStoreValue: PropTypes.func.isRequired,
  mainVisualisation: PropTypes.string.isRequired,
}

const mapToProps = ({
  mainVisualisation
}) => ({
  mainVisualisation
})

export default connect(
  mapToProps,
  actions
)(MainArea)
