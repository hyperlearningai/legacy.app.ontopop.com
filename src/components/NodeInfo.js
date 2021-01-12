import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs'
import {
  ImCross
} from 'react-icons/im'
import actions from '../store/actions'
import NodeInfoDetails from './NodeInfoDetails'

const NodeInfo = ({
  selectedNodes,
  availableNodesNormalised,
  removeFromArray
}) => {
  const { t } = useTranslation()

  const [view, setView] = useState('')
  const [nodeId, setNodeId] = useState('')

  return (
    <div className="node-info">
      <div className="node-info-navbar">
        <div className="node-info-navbar-button">
          {
            view !== '' && (
              <button
                type="button"
                title={t('goBack')}
                onClick={() => setView('')}
              >
                <BsChevronLeft />
              </button>
            )
          }
        </div>
        {
          view !== ''
            ? availableNodesNormalised[nodeId].label
            : t('selectedNodes')
        }
      </div>

      <div className="node-info-body">
        {
          view === ''
            ? selectedNodes.map((selectedNode) => {
              const selectedNodeInfo = availableNodesNormalised[selectedNode]

              if (!selectedNodeInfo) return null

              const { label, id } = selectedNodeInfo

              return (
                <div
                  className="node-info-body-row"
                  key={`selected-node-row-${id}`}
                >
                  <button
                    type="button"
                    title={t('removeSelectedNode')}
                    onClick={() => removeFromArray('selectedNodes', id)}
                  >
                    <ImCross />
                  </button>
                  <span>
                    {label}
                  </span>
                  <button
                    type="button"
                    title={t('viewNode')}
                    onClick={() => {
                      setNodeId(id)
                      setView('node')
                    }}
                  >
                    <BsChevronRight />
                  </button>
                </div>
              )
            })
            : (
              <NodeInfoDetails
                nodeId={nodeId}
              />
            )
        }
      </div>
    </div>
  )
}

NodeInfo.propTypes = {
  selectedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  availableNodesNormalised: PropTypes.shape().isRequired,
  removeFromArray: PropTypes.func.isRequired,
}

const mapToProps = ({
  selectedNodes,
  availableNodesNormalised,
  deletedNodes
}) => ({
  selectedNodes,
  availableNodesNormalised,
  deletedNodes
})

export default connect(
  mapToProps,
  actions
)(NodeInfo)
