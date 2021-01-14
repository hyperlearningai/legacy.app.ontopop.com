import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import actions from '../store/actions'
import EdgeSelectionDetailsRow from './EdgeSelectionDetailsRow'

const EdgesSelectionDetails = ({
  edgeId,
  objectPropertiesFromApi,
  edgesConnections,
}) => {
  const { t } = useTranslation()

  const selectedEdge = objectPropertiesFromApi[edgeId]

  const tableRowNames = Object.keys(selectedEdge).filter((key) => typeof selectedEdge[key] !== 'object'
    && !key.includes('label')).sort()

  let connections = []

  if (edgesConnections[edgeId]) {
    connections = edgesConnections[edgeId]
  }

  return (
    <div className="edges-selection-details">
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

      <div className="edges-selection-details-title">
        {t('nodesProperties')}
      </div>

      {
        connections.length > 0 ? (
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
                {
                  connections.map((connection) => (
                    <EdgeSelectionDetailsRow
                      key={`edge-relationship-row-${connection.from}-${connection.to}`}
                      connection={connection}
                    />
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

EdgesSelectionDetails.propTypes = {
  edgeId: PropTypes.string.isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
  edgesConnections: PropTypes.shape().isRequired,
}

const mapToProps = ({
  objectPropertiesFromApi,
  edgesConnections
}) => ({
  objectPropertiesFromApi,
  edgesConnections
})

export default connect(
  mapToProps,
  actions
)(EdgesSelectionDetails)
