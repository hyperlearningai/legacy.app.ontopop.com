import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import actions from '../store/actions'
import EdgeInfoDetailsRow from './EdgeInfoDetailsRow'

const EdgeInfoDetails = ({
  edgeId,
  objectPropertiesFromApi,
  edgesConnections,
}) => {
  const { t } = useTranslation()

  const { OwlObjectProperties } = objectPropertiesFromApi

  const selectedEdge = OwlObjectProperties[edgeId]

  const tableRowNames = Object.keys(selectedEdge).filter((key) => typeof selectedEdge[key] !== 'object'
    && !key.includes('label')).sort()

  let connections = []

  if (edgesConnections[edgeId]) {
    connections = edgesConnections[edgeId]
  }

  return (
    <div className="edge-info-details">
      <div className="edge-info-details-title">
        {t('properties')}
      </div>

      <div className="edge-info-details-table">
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
                    {selectedEdge[tableRowName] || t('null')}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <div className="edge-info-details-title">
        {t('nodesProperties')}
      </div>

      <div className="edge-info-details-table">
        <table>
          <thead>
            <tr>
              <th />
              <th>{t('from')}</th>
              <th>{t('to')}</th>
            </tr>
          </thead>
          <tbody>
            {
              connections.map((connection) => (
                <EdgeInfoDetailsRow
                  key={`edge-relationship-row-${connection.from}-${connection.to}`}
                  connection={connection}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

EdgeInfoDetails.propTypes = {
  edgeId: PropTypes.string.isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
  edgesConnections: PropTypes.shape().isRequired,
}

const mapToProps = ({
  objectPropertiesFromApi,
  nodesConnections,
  edgesConnections
}) => ({
  objectPropertiesFromApi,
  nodesConnections,
  edgesConnections
})

export default connect(
  mapToProps,
  actions
)(EdgeInfoDetails)
