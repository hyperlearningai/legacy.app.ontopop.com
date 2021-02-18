import { useState, Fragment } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  BsCaretRightFill,
  BsCaretDownFill,
} from 'react-icons/bs'
import actions from '../store/actions'
import { PROPERTIES_TO_IGNORE } from '../constants/graph'
import getNode from '../utils/nodesEdgesUtils/getNode'

const EdgeSelectionDetailsRow = ({
  connection,
}) => {
  const { t } = useTranslation()

  const [isExpanded, toggleExpanded] = useState(false)

  const nodeKeys = Object.keys(getNode(connection.from)).filter((key) => typeof getNode(connection.from)[key] !== 'object'
    && !key.includes('label')
    && !PROPERTIES_TO_IGNORE.includes(key)).sort()

  const fromLabel = getNode(connection.from).label
  const toLabel = getNode(connection.to).label

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
          {fromLabel}
        </span>
        <div className="edge-node-info">
          {
            isExpanded && (
              nodeKeys.map((nodeKey) => (
                (
                  <Fragment key={`edge-node-from-${nodeKey}-${connection.from}-${connection.to}`}>
                    <div className="edge-node-info-title">{nodeKey}</div>
                    <div className="edge-node-info-value">{getNode(connection.from)[nodeKey]}</div>
                  </Fragment>
                )
              ))
            )
          }
        </div>
      </td>
      <td className="edge-node-cell-to">
        <span>
          {toLabel}
        </span>
        <div className="edge-node-info">
          {
            isExpanded && (
              nodeKeys.map((nodeKey) => (
                (
                  <Fragment key={`edge-node-to-${nodeKey}-${connection.from}-${connection.to}`}>
                    <div className="edge-node-info-title">{nodeKey}</div>
                    <div className="edge-node-info-value">{getNode(connection.to)[nodeKey]}</div>
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
  connection: PropTypes.shape().isRequired,
}

export default connect(
  null,
  actions
)(EdgeSelectionDetailsRow)
