import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useState, Fragment } from 'react'
import {
  BsCaretRightFill,
  BsCaretDownFill,
} from 'react-icons/bs'
import actions from '../store/actions'
import { EDGE_PROPERTIES, RESERVED_PROPERTIES } from '../constants/graph'
import getNode from '../utils/nodesEdgesUtils/getNode'
import getEdge from '../utils/nodesEdgesUtils/getEdge'

const EdgesSelectionDetails = ({
  edgeId,
}) => {
  const { t } = useTranslation()
  const [isExpanded, toggleExpanded] = useState(false)

  const edge = getEdge(edgeId)
  const {
    from,
    to
  } = edge

  const fromObject = getNode(from)
  const toObject = getNode(to)

  const tableRowNames = EDGE_PROPERTIES.sort()

  return (
    <div className="edges-selection-details m-t-10">
      <div className="edges-selection-details-title">
        {t('properties')}
      </div>

      <div className="edges-selection-details-table">
        <table>
          <thead>
            <tr>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {
              tableRowNames.map((tableRowName) => {
                if (!edge[tableRowName]) return null

                return (
                  <tr
                    key={`details-row-${tableRowName}`}
                  >
                    <td>
                      {tableRowName}
                    </td>
                    <td>
                      {edge[tableRowName] || t('null')}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

      <div className="edges-selection-details-title">
        {t('nodesProperties')}
      </div>

      <div className="edges-selection-details-table">
        <table>
          <thead>
            <tr>
              <th />
              <th>{t('from')}</th>
              <th>{t('to')}</th>
            </tr>
          </thead>
          <tbody>
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
                  {fromObject.label}
                </span>
                <div className="edge-node-info">
                  {
                    isExpanded && (
                      Object.keys(fromObject).filter((key) => !RESERVED_PROPERTIES.includes(key)).sort().map((nodeKey) => (
                        (
                          <Fragment key={`edge-node-from-${nodeKey}-${from}-${to}`}>
                            <div className="edge-node-info-title">{nodeKey}</div>
                            <div className="edge-node-info-value">{fromObject[nodeKey]}</div>
                          </Fragment>
                        )
                      ))
                    )
                  }
                </div>
              </td>
              <td className="edge-node-cell-to">
                <span>
                  {toObject.label}
                </span>
                <div className="edge-node-info">
                  {
                    isExpanded && (
                      Object.keys(toObject).filter((key) => !RESERVED_PROPERTIES.includes(key)).sort().map((nodeKey) => (
                        (
                          <Fragment key={`edge-node-to-${nodeKey}-${from}-${to}`}>
                            <div className="edge-node-info-title">{nodeKey}</div>
                            <div className="edge-node-info-value">{toObject[nodeKey]}</div>
                          </Fragment>
                        )
                      ))
                    )
                  }
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

EdgesSelectionDetails.propTypes = {
  edgeId: PropTypes.string.isRequired,
}

export default connect(
  null,
  actions
)(EdgesSelectionDetails)
