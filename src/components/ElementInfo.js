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
import ElementInfoDetails from './ElementInfoDetails'

const ElementInfo = ({
  selectedNodes,
  availableNodesNormalised,
  removeFromArray
}) => {
  const { t } = useTranslation()

  const [view, setView] = useState('')
  const [nodeId, setNodeId] = useState('')

  return (
    <div className="element-info">
      <div className="element-info-navbar">
        <div className="element-info-navbar-button">
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

      <div className="element-info-body">
        {
          view === ''
            ? selectedNodes.map((selectedNode) => {
              const selectedElementInfo = availableNodesNormalised[selectedNode]

              if (!selectedElementInfo) return null

              const { label, id } = selectedElementInfo

              return (
                <div
                  className="element-info-body-row"
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
              <ElementInfoDetails
                nodeId={nodeId}
              />
            )
        }
      </div>
    </div>
  )
}

ElementInfo.propTypes = {
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
)(ElementInfo)
