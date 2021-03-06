import {
  useEffect
} from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import actions from '../store/actions'
import NodesSelectionDetails from './NodesSelectionDetails'
import { SIDEBAR_VIEW_NODES_SELECTION } from '../constants/views'
import getNode from '../utils/nodesEdgesUtils/getNode'
import resetSelectedNode from '../utils/nodesSelection/resetSelectedNode'
import highlightSelectedNode from '../utils/nodesSelection/highlightSelectedNode'

const NodesSelection = ({
  selectedNode,
  setStoreState
}) => {
  const { t } = useTranslation()

  useEffect(() => () => {
    setStoreState('selectedNode', undefined)
    setStoreState('isNodeSelectable', false)

    resetSelectedNode({
      setStoreState
    })
  }, [])

  useEffect(() => {
    if (selectedNode && selectedNode !== '') {
      resetSelectedNode({
        setStoreState
      })

      highlightSelectedNode({
        setStoreState,
        selectedNode
      })
    }
  }, [selectedNode])

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
      {!isNodeSelected ? (
        <div className="nodes-selection">
          <div className="nodes-selection-message">
            {t('selectNodeFromGraph')}
          </div>
        </div>
      ) : (
        <NodesSelectionDetails
          nodeId={selectedNode}
        />
      )}
    </>
  )
}

NodesSelection.propTypes = {
  selectedNode: PropTypes.string,
  setStoreState: PropTypes.func.isRequired,
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
