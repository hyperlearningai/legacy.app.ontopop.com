import {
  useEffect
} from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Dropdown } from 'primereact/dropdown'
import actions from '../store/actions'
import NodesSelectionDetails from './NodesSelectionDetails'
import { SIDEBAR_VIEW_NODES_SELECTION } from '../constants/views'
import getNode from '../utils/nodesEdgesUtils/getNode'
import setNodesStyle from '../utils/networkStyling/setNodesStyle'
import highlightSelectedNode from '../utils/nodesSelection/highlightSelectedNode'
import getNodeIds from '../utils/nodesEdgesUtils/getNodeIds'
import getElementLabel from '../utils/networkStyling/getElementLabel'
import { OPERATION_TYPE_UPDATE } from '../constants/store'

const NodesSelection = ({
  selectedNode,
  updateStoreValue,
}) => {
  const { t } = useTranslation()

  useEffect(() => () => {
    updateStoreValue(['selectedNode'], OPERATION_TYPE_UPDATE, undefined)
    updateStoreValue(['isNodeSelectable'], OPERATION_TYPE_UPDATE, false)

    setNodesStyle()
  }, [])

  useEffect(() => {
    if (selectedNode && selectedNode !== '') {
      setNodesStyle()

      highlightSelectedNode({
        updateStoreValue,
        selectedNode
      })
    }
  }, [selectedNode])

  const availableNodeIds = getNodeIds()

  const availableNodes = availableNodeIds.length > 0 ? availableNodeIds.map(
    (nodeId) => {
      const label = getElementLabel({
        type: 'node',
        id: nodeId
      })

      return ({
        value: nodeId,
        label: label || nodeId
      })
    }
  ) : []

  const isNodeSelected = selectedNode && selectedNode !== ''

  return (
    <>
      <div className="sidebar-main-title">
        {!isNodeSelected
          ? t(SIDEBAR_VIEW_NODES_SELECTION)
          : (
            <>
              {`${t('node')}: ${getNode(selectedNode).label}`}
            </>
          )}
      </div>
      <div className="nodes-selection">
        <div className="nodes-selection-message">
          {t('selectNodeFromGraphOrFromList')}
        </div>

        <div className="nodes-selection-dropdown">
          <Dropdown
            id="node-select"
            value={selectedNode}
            filter
            options={availableNodes}
            onChange={(e) => updateStoreValue(['selectedNode'], OPERATION_TYPE_UPDATE, e.value)}
            placeholder={t('selectNode')}
          />
        </div>

        {isNodeSelected && (
          <NodesSelectionDetails
            nodeId={selectedNode}
          />
        )}
      </div>
    </>
  )
}

NodesSelection.propTypes = {
  selectedNode: PropTypes.string,
  updateStoreValue: PropTypes.func.isRequired,
}

NodesSelection.defaultProps = {
  selectedNode: undefined
}

const mapToProps = ({
  selectedNode,
}) => ({
  selectedNode,
})

export default connect(
  mapToProps,
  actions
)(NodesSelection)
