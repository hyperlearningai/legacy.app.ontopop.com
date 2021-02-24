import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import actions from '../store/actions'
import { RESERVED_PROPERTIES } from '../constants/graph'
import getNode from '../utils/nodesEdgesUtils/getNode'
import getEdge from '../utils/nodesEdgesUtils/getEdge'

const NodesSelectionDetails = ({
  nodeId,
  nodesConnections,
}) => {
  const { t } = useTranslation()

  const selectedNode = getNode(nodeId)

  const tableRowNames = Object.keys(selectedNode).filter((key) => !RESERVED_PROPERTIES.includes(key)).sort()

  let connections = []

  if (selectedNode.id && nodesConnections[selectedNode.id]) {
    connections = nodesConnections[selectedNode.id]
  }

  return (
    <div className="nodes-selection-details m-t-10">
      <div className="nodes-selection-details-title">
        {t('properties')}
      </div>

      <div className="nodes-selection-details-table">
        <table>
          <thead>
            <tr>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {
              tableRowNames.map((tableRowName) => (
                <tr
                  key={`details-row-${tableRowName}`}
                >
                  <td>
                    {tableRowName}
                  </td>
                  <td>
                    {selectedNode[tableRowName] || t('null')}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <div className="nodes-selection-details-title">
        {t('relationships')}
      </div>

      {
        connections.length > 0 ? (
          <div className="nodes-selection-details-table">
            <table>
              <thead>
                <tr>
                  <th>{t('from')}</th>
                  <th>{t('connection')}</th>
                  <th>{t('to')}</th>
                </tr>
              </thead>
              <tbody>
                {
                  connections.map((triple) => {
                    const {
                      from,
                      to,
                      label
                    } = getEdge(triple)

                    const fromLabel = getNode(from).label
                    const toLabel = getNode(to).label

                    return (
                      <tr
                        key={`relationship-row-${from}-${label}-${to}`}
                      >
                        <td className={`${from === selectedNode.id ? 'bold italic' : ''}`}>
                          {fromLabel}
                        </td>
                        <td>
                          {label}
                        </td>
                        <td className={`${to === selectedNode.id ? 'bold italic' : ''}`}>
                          {toLabel}
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        ) : (
          <>
            {t('noRelationships')}
          </>
        )
      }

    </div>
  )
}

NodesSelectionDetails.propTypes = {
  nodeId: PropTypes.string.isRequired,
  nodesConnections: PropTypes.shape().isRequired,
}

const mapToProps = ({
  nodesConnections
}) => ({
  nodesConnections
})

export default connect(
  mapToProps,
  actions
)(NodesSelectionDetails)
