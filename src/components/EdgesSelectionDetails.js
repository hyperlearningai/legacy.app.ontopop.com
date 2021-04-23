import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import actions from '../store/actions'
import { EDGE_PROPERTIES } from '../constants/graph'
import getNode from '../utils/nodesEdgesUtils/getNode'
import getEdge from '../utils/nodesEdgesUtils/getEdge'
import EdgesSelectionDetailsNode from './EdgesSelectionDetailsNode'

const EdgesSelectionDetails = ({
  edgeId,
}) => {
  const { t } = useTranslation()

  const edge = getEdge(edgeId)
  const {
    from,
    to
  } = edge

  const fromObject = getNode(from)
  const toObject = getNode(to)

  const tableRowNames = EDGE_PROPERTIES.sort()

  return (
    <div className="elements-selection-details m-t-10">
      <div className="sidebar-main-body-title m-b-20 m-t-30">
        {t('properties')}
      </div>

      <div className="elements-selection-details-table elements-selection-details-table-properties">
        {
          tableRowNames.map((tableRowName) => {
            if (!edge[tableRowName]) return null

            return (
              <div
                key={`details-row-${tableRowName}`}
                className="elements-selection-details-table-row"
              >
                <div className="light-bold">
                  {tableRowName}
                </div>
                <div>
                  {edge[tableRowName] || t('null')}
                </div>
              </div>
            )
          })
        }
      </div>

      <div className="sidebar-main-body-title m-b-20 m-t-50">
        {t('nodesProperties')}
      </div>

      <div className="elements-selection-details-table elements-selection-details-table-relationships">
        <div
          className="elements-selection-details-table-row"
        >
          <div className="light-bold">{t('from')}</div>
          <EdgesSelectionDetailsNode
            node={fromObject}
          />
        </div>

        <div
          className="elements-selection-details-table-row"
        >
          <div className="light-bold">{t('to')}</div>
          <EdgesSelectionDetailsNode
            node={toObject}
          />
        </div>
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
