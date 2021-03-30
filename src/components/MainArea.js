import { useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import actions from '../store/actions'
import GraphVisualisation from './GraphVisualisation'
import GraphSearch from './GraphSearch'
import {
  SIDEBAR_VIEW_ENTRY_SEARCH
} from '../constants/views'
import startupActions from '../utils/graphVisualisation/startupActions'

const MainArea = ({
  updateStoreValue,
  graphData,
  currentGraph
}) => {
  const { t } = useTranslation()

  const router = useRouter()

  const { view } = router.query

  useEffect(() => startupActions({
    updateStoreValue,
    t
  }),
  [])

  return (
    <>
      {
        view
        && graphData
        && graphData[currentGraph]
        && view !== SIDEBAR_VIEW_ENTRY_SEARCH
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
  updateStoreValue: PropTypes.func.isRequired,
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
