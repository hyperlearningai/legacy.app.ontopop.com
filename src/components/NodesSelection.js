import { useState, useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import NodesSelectionDetails from './NodesSelectionDetails'
import { SIDEBAR_VIEW_NODES_SELECTION } from '../constants/views'

const NodesSelection = ({
  removeFromArray,
  availableNodesNormalised,
  selectedNodes,
  resetSelectedNodes
}) => {
  const { t } = useTranslation()

  const [isNodeSelected, toggleNodeSelected] = useState(false)
  const [nodeId, setNodeId] = useState('')

  useEffect(() => () => resetSelectedNodes(), [])

  return (
    <>
      <div className="sidebar-main-title">
        {!isNodeSelected
          ? t(SIDEBAR_VIEW_NODES_SELECTION)
          : (
            <>
              <Button
                tooltip={t('goBack')}
                onClick={() => toggleNodeSelected(false)}
                icon="pi pi-chevron-left"
                iconPos="left"
              />
              {`${t('node')}: ${availableNodesNormalised[nodeId].label}`}
            </>
          )}
      </div>
      {!isNodeSelected ? (
        <div className="nodes-selection">
          {
            selectedNodes.length > 0
              ? selectedNodes.map((selectedNode) => {
                const { label } = availableNodesNormalised[selectedNode]

                return (
                  <div
                    className="nodes-selection-row"
                    key={`selected-node-row-${selectedNode}`}
                  >
                    <div className="nodes-selection-row-delete">
                      <Button
                        tooltip={`${t('removeNode')}: ${label}`}
                        onClick={() => removeFromArray('selectedNodes', selectedNode)}
                        icon="pi pi-times"
                      />
                    </div>

                    <div className="nodes-selection-row-main">
                      <Button
                        tooltip={`${t('viewNode')}: ${label}`}
                        onClick={() => {
                          setNodeId(selectedNode)
                          toggleNodeSelected(true)
                        }}
                        label={label}
                        icon="pi pi-chevron-right"
                        iconPos="right"
                      />
                    </div>
                  </div>
                )
              }) : (
                <div className="nodes-selection-message">
                  {t('selectNodeFromGraph')}
                </div>
              )
          }
        </div>
      ) : (
        <NodesSelectionDetails
          nodeId={nodeId}
        />
      )}
    </>
  )
}

NodesSelection.propTypes = {
  selectedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeFromArray: PropTypes.func.isRequired,
  availableNodesNormalised: PropTypes.shape().isRequired,
  resetSelectedNodes: PropTypes.func.isRequired,
}

const mapToProps = ({
  selectedNodes,
  availableNodesNormalised,
}) => ({
  selectedNodes,
  availableNodesNormalised,
})

export default connect(
  mapToProps,
  actions
)(NodesSelection)
