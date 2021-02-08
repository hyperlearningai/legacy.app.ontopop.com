import { useState, Fragment } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  BsCaretRightFill,
  BsCaretDownFill,
} from 'react-icons/bs'
import actions from '../store/actions'

const EdgeSelectionDetailsRow = ({
  availableNodes,
  connection,
}) => {
  const { t } = useTranslation()

  const [isExpanded, toggleExpanded] = useState(false)

  const nodeKeys = Object.keys(availableNodes.get(connection.from)).filter((key) => typeof availableNodes.get(connection.from)[key] !== 'object'
    && !key.includes('label')).sort()

  return (
    <tr>
      <td className="icon-cell">
        <button
          type="button"
          title={t('removeSelectedEdge')}
          onClick={() => toggleExpanded(!isExpanded)}
        >
          {isExpanded ? <BsCaretDownFill /> : <BsCaretRightFill />}
        </button>
      </td>
      <td className="edge-node-cell-from">
        <span>
          {connection.fromLabel}
        </span>
        <div className="edge-node-info">
          {
            isExpanded && (
              nodeKeys.map((nodeKey) => (
                (
                  <Fragment key={`edge-node-from-${nodeKey}-${connection.fromLabel}-${connection.toLabel}`}>
                    <div className="edge-node-info-title">{nodeKey}</div>
                    <div className="edge-node-info-value">{availableNodes.get(connection.from)[nodeKey]}</div>
                  </Fragment>
                )
              ))
            )
          }
        </div>
      </td>
      <td className="edge-node-cell-to">
        <span>
          {connection.toLabel}
        </span>
        <div className="edge-node-info">
          {
            isExpanded && (
              nodeKeys.map((nodeKey) => (
                (
                  <Fragment key={`edge-node-to-${nodeKey}-${connection.fromLabel}-${connection.toLabel}`}>
                    <div className="edge-node-info-title">{nodeKey}</div>
                    <div className="edge-node-info-value">{availableNodes.get(connection.to)[nodeKey]}</div>
                  </Fragment>
                )
              ))
            )
          }
        </div>
      </td>
    </tr>
  )
}

EdgeSelectionDetailsRow.propTypes = {
  availableNodes: PropTypes.shape().isRequired,
  connection: PropTypes.shape().isRequired,
}

const mapToProps = ({
  availableNodes,
}) => ({
  availableNodes,
})

export default connect(
  mapToProps,
  actions
)(EdgeSelectionDetailsRow)
