import { useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Dropdown } from 'primereact/dropdown'
import actions from '../store/actions'
import EdgesSelectionDetails from './EdgesSelectionDetails'
import { SIDEBAR_VIEW_EDGES_SELECTION } from '../constants/views'
import getEdge from '../utils/nodesEdgesUtils/getEdge'
import setEdgesStyle from '../utils/networkStyling/setEdgesStyle'
import highlightSelectedEdge from '../utils/edgesSelection/highlightSelectedEdge'
import getEdgeIds from '../utils/nodesEdgesUtils/getEdgeIds'
import getElementLabel from '../utils/networkStyling/getElementLabel'

const EdgesSelection = ({
  selectedEdge,
  setStoreState,
}) => {
  const { t } = useTranslation()

  useEffect(() => () => {
    setStoreState('selectedEdge', undefined)

    setEdgesStyle()
  }, [])

  useEffect(() => {
    if (selectedEdge && selectedEdge !== '') {
      setEdgesStyle()

      highlightSelectedEdge({
        setStoreState,
        selectedEdge
      })
    }
  }, [selectedEdge])

  const availableEdgeIds = getEdgeIds()

  const availableEdges = availableEdgeIds.length > 0 ? availableEdgeIds.map((edgeId) => {
    const {
      label,
      from,
      to,
      userDefined
    } = getEdge(edgeId)

    const fromLabel = getElementLabel({
      type: 'node',
      id: from
    })

    const toLabel = getElementLabel({
      type: 'node',
      id: to
    })

    const connectionLabel = `${fromLabel} => (${label}) => ${toLabel}`

    return ({
      value: edgeId,
      label: connectionLabel,
      userDefined
    })
  }) : 0

  const isEdgeSelected = selectedEdge && selectedEdge !== ''

  return (
    <>
      <h1 className="sidebar-main-title">
        {!isEdgeSelected
          ? t(SIDEBAR_VIEW_EDGES_SELECTION)
          : (
            <>
              {`${t('edge')}: ${getEdge(selectedEdge).label}`}
            </>
          )}
      </h1>

      <div className="edges-selection">
        <div className="edges-selection-message">
          {t('selectEdgeFromGraphOrFromList')}
        </div>

        <div className="edges-selection-dropdown">
          <Dropdown
            ariaLabel="edge-select"
            id="edge-select"
            value={selectedEdge}
            filter
            options={availableEdges}
            onChange={(e) => setStoreState('selectedEdge', e.value)}
            placeholder={t('selectEdge')}
          />
        </div>

        {
          isEdgeSelected && (
            <EdgesSelectionDetails
              edgeId={selectedEdge}
            />
          )
        }
      </div>
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
