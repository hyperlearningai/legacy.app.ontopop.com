import { useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import actions from '../store/actions'
import EdgesSelectionDetails from './EdgesSelectionDetails'
import { SIDEBAR_VIEW_EDGES_SELECTION } from '../constants/views'
import getEdge from '../utils/nodesEdgesUtils/getEdge'
import resetSelectedEdges from '../utils/edgesSelection/resetSelectedEdges'
import highlightSelectedEdge from '../utils/edgesSelection/highlightSelectedEdge'

const EdgesSelection = ({
  selectedEdge,
  setStoreState
}) => {
  const { t } = useTranslation()

  useEffect(() => () => {
    setStoreState('selectedEdge', undefined)

    resetSelectedEdges({
      setStoreState
    })
  }, [])

  useEffect(() => {
    if (selectedEdge && selectedEdge !== '') {
      resetSelectedEdges({
        setStoreState
      })

      highlightSelectedEdge({
        setStoreState,
        selectedEdge
      })
    }
  }, [selectedEdge])

  const isEdgeSelected = selectedEdge && selectedEdge !== ''

  return (
    <>
      <div className="sidebar-main-title">
        {!isEdgeSelected
          ? t(SIDEBAR_VIEW_EDGES_SELECTION)
          : (
            <>
              {`${t('edge')}: ${getEdge(selectedEdge).label}`}
            </>
          )}
      </div>
      {!isEdgeSelected ? (
        <div className="edges-selection">
          <div className="edges-selection-message">
            {t('selectEdgeFromGraph')}
          </div>
        </div>
      ) : (
        <EdgesSelectionDetails
          edgeId={selectedEdge}
        />
      )}
    </>
  )
}

EdgesSelection.propTypes = {
  selectedEdge: PropTypes.string,
  setStoreState: PropTypes.func.isRequired,
}

EdgesSelection.defaultProps = {
  selectedEdge: undefined
}

const mapToProps = ({
  selectedEdge,
}) => ({
  selectedEdge,
})

export default connect(
  mapToProps,
  actions
)(EdgesSelection)
