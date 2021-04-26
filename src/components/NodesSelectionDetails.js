import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import actions from '../store/actions'
import { RESERVED_PROPERTIES } from '../constants/graph'
import getNode from '../utils/nodesEdgesUtils/getNode'
import getEdge from '../utils/nodesEdgesUtils/getEdge'

const NodesSelectionDetails = ({
  nodeId,
  nodesEdges,
}) => {
  const { t } = useTranslation()

  const selectedNode = getNode(nodeId)

  const tableRowNames = selectedNode && Object.keys(selectedNode).filter((key) => !RESERVED_PROPERTIES.includes(key)).sort()

  let connections = []

  if (selectedNode?.id && nodesEdges[selectedNode.id]) {
    connections = nodesEdges[selectedNode.id]
  }

  return (
    <div className="elements-selection-details">
      <div className="sidebar-main-body-title m-b-20 m-t-30">
        {t('properties')}
      </div>

      <div className="elements-selection-details-table elements-selection-details-table-properties">
        {
          tableRowNames && tableRowNames.length > 0 ? tableRowNames.map((tableRowName) => (
            <div
              key={`details-row-${tableRowName}`}
              className="elements-selection-details-table-row"
            >
              <div className="light-bold">
                {tableRowName}
              </div>
              <div>
                {selectedNode[tableRowName] || t('null')}
              </div>
            </div>
          )) : null
        }
      </div>

      <div className="sidebar-main-body-title m-b-20 m-t-50">
        {t('relationships')}
      </div>

      {
        connections.length > 0 ? (
          <div className="elements-selection-details-table elements-selection-details-table-relationships">
            <div
              className="elements-selection-details-table-row"
            >
              <div className="light-bold">{t('from')}</div>
              <div className="light-bold">{t('edge')}</div>
              <div className="light-bold">{t('to')}</div>
            </div>

            {
              connections.map((triple) => {
                const edge = getEdge(triple)

                if (edge === null) return null

                const {
                  from,
                  to,
                  label
                } = edge

                const fromLabel = getNode(from).label
                const toLabel = getNode(to).label

                return (
                  <div
                    key={`relationship-row-${from}-${label}-${to}`}
                    className="elements-selection-details-table-row"
                  >
                    <div className={`${from === selectedNode.id ? 'light-bold italic' : ''}`}>
                      {fromLabel}
                    </div>
                    <div>
                      {label}
                    </div>
                    <div className={`${to === selectedNode.id ? 'light-bold italic' : ''}`}>
                      {toLabel}
                    </div>
                  </div>
                )
              })
            }
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
  nodesEdges: PropTypes.shape().isRequired,
}

const mapToProps = ({
  nodesEdges
}) => ({
  nodesEdges
})

export default connect(
  mapToProps,
  actions
)(NodesSelectionDetails)
