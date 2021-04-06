import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Dropdown } from 'primereact/dropdown'
import { orderBy } from 'lodash'
import actions from '../store/actions'
import EdgesSelectionDetails from './EdgesSelectionDetails'
import { SIDEBAR_VIEW_EDGES_SELECTION } from '../constants/views'
import getEdge from '../utils/nodesEdgesUtils/getEdge'
import getEdgeIds from '../utils/nodesEdgesUtils/getEdgeIds'
import getElementLabel from '../utils/networkStyling/getElementLabel'
import updateHighlightedElement from '../utils/networkStyling/updateHighlightedElement'

const EdgesSelection = ({
  selectedElement,
  updateStoreValue,
}) => {
  const { t } = useTranslation()

  const availableEdgeIds = getEdgeIds()

  const availableEdges = availableEdgeIds.length > 0 ? orderBy(availableEdgeIds.map((edgeId) => {
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
  }), ['label'], ['asc']) : 0

  const [selectedEdge, selectedEdgeType] = selectedElement ? Object.entries(selectedElement)[0] : [undefined, false]

  return (
    <>
      <h1 className="sidebar-main-title">
        {selectedEdgeType !== 'edge'
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
            id="edge-select"
            value={selectedEdge}
            filter
            options={availableEdges}
            onChange={(e) => updateHighlightedElement({
              updateStoreValue,
              id: e.value,
              type: 'edge'
            })}
            placeholder={t('selectEdge')}
          />
        </div>

        {
          selectedEdgeType === 'edge' && (
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
  selectedElement: PropTypes.shape(),
  updateStoreValue: PropTypes.func.isRequired,
}

EdgesSelection.defaultProps = {
  selectedElement: undefined
}

const mapToProps = ({
  selectedElement,
}) => ({
  selectedElement
})

export default connect(
  mapToProps,
  actions
)(EdgesSelection)
