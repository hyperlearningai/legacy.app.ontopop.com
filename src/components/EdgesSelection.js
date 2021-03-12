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
import getNode from '../utils/nodesEdgesUtils/getNode'

const EdgesSelection = ({
  selectedEdge,
  setStoreState,
  userDefinedNodeStyling,
  globalNodeStyling
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

    const fromNode = getNode(from)
    const { stylingNodeCaptionProperty: fromStylingNodeCaptionProperty } = from.userDefined ? userDefinedNodeStyling : globalNodeStyling
    const fromLabel = fromNode ? fromNode[fromStylingNodeCaptionProperty] : ''

    const toNode = getNode(to)
    const { stylingNodeCaptionProperty: toStylingNodeCaptionProperty } = from.userDefined ? userDefinedNodeStyling : globalNodeStyling
    const toLabel = toNode ? toNode[toStylingNodeCaptionProperty] : ''

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
      <div className="sidebar-main-title">
        {!isEdgeSelected
          ? t(SIDEBAR_VIEW_EDGES_SELECTION)
          : (
            <>
              {`${t('edge')}: ${getEdge(selectedEdge).label}`}
            </>
          )}
      </div>

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
  userDefinedNodeStyling: PropTypes.shape().isRequired,
  globalNodeStyling: PropTypes.shape().isRequired,
}

EdgesSelection.defaultProps = {
  selectedEdge: undefined
}

const mapToProps = ({
  selectedEdge,
  userDefinedNodeStyling,
  globalNodeStyling
}) => ({
  selectedEdge,
  userDefinedNodeStyling,
  globalNodeStyling
})

export default connect(
  mapToProps,
  actions
)(EdgesSelection)
