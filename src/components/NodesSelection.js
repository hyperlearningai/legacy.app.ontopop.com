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

const NodesSelection = ({
  selectedNode,
  setStoreState,
  userDefinedNodeStyling,
  globalNodeStyling
}) => {
  const { t } = useTranslation()

  useEffect(() => () => {
    setStoreState('selectedNode', undefined)
    setStoreState('isNodeSelectable', false)

    setNodesStyle()
  }, [])

  useEffect(() => {
    if (selectedNode && selectedNode !== '') {
      setNodesStyle()

      highlightSelectedNode({
        setStoreState,
        selectedNode
      })
    }
  }, [selectedNode])

  const availableNodeIds = getNodeIds()

  const availableNodes = availableNodeIds.length > 0 ? availableNodeIds.map(
    (nodeId) => {
      const node = getNode(nodeId)

      const { stylingNodeCaptionProperty } = node.userDefined ? userDefinedNodeStyling : globalNodeStyling

      const label = node[stylingNodeCaptionProperty]

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
            onChange={(e) => setStoreState('selectedNode', e.value)}
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
  setStoreState: PropTypes.func.isRequired,
  userDefinedNodeStyling: PropTypes.shape().isRequired,
  globalNodeStyling: PropTypes.shape().isRequired,
}

NodesSelection.defaultProps = {
  selectedNode: undefined
}

const mapToProps = ({
  selectedNode,
  userDefinedNodeStyling,
  globalNodeStyling
}) => ({
  selectedNode,
  userDefinedNodeStyling,
  globalNodeStyling
})

export default connect(
  mapToProps,
  actions
)(NodesSelection)
