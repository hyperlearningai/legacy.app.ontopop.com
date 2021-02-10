import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import actions from '../store/actions'
import { PROPERTIES_TO_IGNORE } from '../constants/graph'
import getNode from '../utils/nodesEdgesUtils/getNode'

const NodesSelectionDetails = ({
  nodeId,
  nodesConnections,
}) => {
  const { t } = useTranslation()

  const selectedNode = getNode(nodeId)

  const tableRowNames = Object.keys(selectedNode).filter((key) => (typeof selectedNode[key] !== 'object'
    && !PROPERTIES_TO_IGNORE.includes(key))).sort()

  let connections = []

  if (selectedNode.id && nodesConnections[selectedNode.id]) {
    connections = nodesConnections[selectedNode.id]
  }

  return (
    <div className="nodes-selection-details m-t-10">
      <h3 className="">
        {`${t('node')}: ${getNode(nodeId).label}`}
      </h3>
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
                connections.map((triple) => (
                  <tr
                    key={`relationship-row-${triple.from}-${triple.label}-${triple.to}`}
                  >
                    <td className={`${triple.from === selectedNode.id ? 'bold italic' : ''}`}>
                      {triple.fromLabel}
                    </td>
                    <td>
                      {triple.label}
                    </td>
                    <td className={`${triple.to === selectedNode.id ? 'bold italic' : ''}`}>
                      {triple.toLabel}
                    </td>
                  </tr>
                ))
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
