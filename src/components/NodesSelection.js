import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Dropdown } from 'primereact/dropdown'
import actions from '../store/actions'
import NodesSelectionDetails from './NodesSelectionDetails'
import { SIDEBAR_VIEW_NODES_SELECTION } from '../constants/views'
import getNode from '../utils/nodesEdgesUtils/getNode'
import updateHighlightedElement from '../utils/networkStyling/updateHighlightedElement'

const NodesSelection = ({
  selectedElement,
  updateStoreValue,
  nodesDropdownLabels,
}) => {
  const { t } = useTranslation()
  const [selectedNode, selectedNodeType] = selectedElement ? Object.entries(selectedElement)[0] : [undefined, false]

  return (
    <>
      <h1 className="sidebar-main-title">
        {selectedNodeType !== 'node'
          ? t(SIDEBAR_VIEW_NODES_SELECTION)
          : (
            <>
              {`${t('node')}: ${getNode(selectedNode).label}`}
            </>
          )}
      </h1>
      <div className="nodes-selection">
        <div className="nodes-selection-message">
          {t('selectNodeFromGraphOrFromList')}
        </div>

        <div className="nodes-selection-dropdown">
          <Dropdown
            id="node-select"
            value={selectedNode}
            filter
            options={nodesDropdownLabels}
            onChange={(e) => updateHighlightedElement({
              updateStoreValue,
              id: e.value,
              type: 'node'
            })}
            placeholder={t('selectNode')}
          />
        </div>

        {selectedNodeType === 'node' && (
          <NodesSelectionDetails
            nodeId={selectedNode}
          />
        )}
      </div>
    </>
  )
}

NodesSelection.propTypes = {
  selectedElement: PropTypes.shape,
  updateStoreValue: PropTypes.func.isRequired,
  nodesDropdownLabels: PropTypes.arrayOf(PropTypes.shape).isRequired,
}

NodesSelection.defaultProps = {
  selectedElement: undefined
}

const mapToProps = ({
  nodesDropdownLabels,
  selectedElement
}) => ({
  nodesDropdownLabels,
  selectedElement,
})

export default connect(
  mapToProps,
  actions
)(NodesSelection)
