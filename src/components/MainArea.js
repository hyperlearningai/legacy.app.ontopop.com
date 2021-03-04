import { useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import actions from '../store/actions'
import startupActions from '../utils/graphVisualisation/startupActions'
import GraphVisualisation from './GraphVisualisation'
import GraphSearch from './GraphSearch'
import { MAIN_VIEW_GRAPH, MAIN_VIEW_SEARCH } from '../constants/views'

const MainArea = ({
  setStoreState,
  addToObject,
  removeFromObject,
  mainVisualisation,
  addNumber
}) => {
  const { t } = useTranslation()

  useEffect(() => startupActions({
    addNumber,
    setStoreState,
    addToObject,
    removeFromObject,
    t
  }), [])

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
  addNumber: PropTypes.func.isRequired,
  setStoreState: PropTypes.func.isRequired,
  removeFromObject: PropTypes.func.isRequired,
  addToObject: PropTypes.func.isRequired,
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
