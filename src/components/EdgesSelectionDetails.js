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

const EdgesSelectionDetails = ({
  edgeId,
  objectPropertiesFromApi,
}) => {
  const { t } = useTranslation()
  const [isExpanded, toggleExpanded] = useState(false)

  const edge = objectPropertiesFromApi[edgeId]
  const {
    sourceNodeId,
    targetNodeId
  } = edge

  const from = getNode(sourceNodeId.toString())
  const to = getNode(targetNodeId.toString())

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
                  {from.label}
                </span>
                <div className="edge-node-info">
                  {
                    isExpanded && (
                      Object.keys(from).filter((key) => !RESERVED_PROPERTIES.includes(key)).sort().map((nodeKey) => (
                        (
                          <Fragment key={`edge-node-from-${nodeKey}-${sourceNodeId}-${targetNodeId}`}>
                            <div className="edge-node-info-title">{nodeKey}</div>
                            <div className="edge-node-info-value">{from[nodeKey]}</div>
                          </Fragment>
                        )
                      ))
                    )
                  }
                </div>
              </td>
              <td className="edge-node-cell-to">
                <span>
                  {to.label}
                </span>
                <div className="edge-node-info">
                  {
                    isExpanded && (
                      Object.keys(to).filter((key) => !RESERVED_PROPERTIES.includes(key)).sort().map((nodeKey) => (
                        (
                          <Fragment key={`edge-node-to-${nodeKey}-${sourceNodeId}-${targetNodeId}`}>
                            <div className="edge-node-info-title">{nodeKey}</div>
                            <div className="edge-node-info-value">{to[nodeKey]}</div>
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
  objectPropertiesFromApi: PropTypes.shape().isRequired,
}

const mapToProps = ({
  objectPropertiesFromApi,
}) => ({
  objectPropertiesFromApi,
})

export default connect(
  mapToProps,
  actions
)(EdgesSelectionDetails)
