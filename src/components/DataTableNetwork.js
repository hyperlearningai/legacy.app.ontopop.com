import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useEffect } from 'react'
import actions from '../store/actions'
import setDataTableTriplesLabels from '../utils/dataTableNetwork/setDataTableTriplesLabels'

const DataTableNetwork = ({
  dataTableTriples,
  dataTableTriplesWithLabels,
  globalEdgeStyling,
  userDefinedEdgeStyling,
  globalNodeStyling,
  userDefinedNodeStyling,
  updateStoreValue
}) => {
  const { t } = useTranslation()

  useEffect(() => setDataTableTriplesLabels({
    updateStoreValue
  }), [
    dataTableTriples,
    globalEdgeStyling,
    userDefinedEdgeStyling,
    globalNodeStyling,
    userDefinedNodeStyling,
  ])

  const filterPlaceholder = `${t('filter')}...`

  return (
    <div className="p-p-3 datatable-container elevate-view">
      <DataTable
        header={t('availableRelationships')}
        filter
        removableSort
        scrollable
        sortMode="multiple"
        scrollHeight="95%"
        className="p-datatable-responsive p-datatable-striped"
        value={dataTableTriplesWithLabels}
        emptyMessage={t('noTriplesAvailable')}
      >
        <Column
          field="fromLabel"
          filter
          filterPlaceholder={filterPlaceholder}
          filterMatchMode="contains"
          header={t('from')}
          sortable
        />
        <Column
          field="edgeLabel"
          filterMatchMode="contains"
          filter
          filterPlaceholder={filterPlaceholder}
          header={t('predicate')}
          sortable
        />
        <Column
          field="toLabel"
          filter
          filterPlaceholder={filterPlaceholder}
          filterMatchMode="contains"
          header={t('to')}
          sortable
        />
      </DataTable>
    </div>
  )
}

DataTableNetwork.propTypes = {
  dataTableTriples: PropTypes.arrayOf(PropTypes.shape).isRequired,
  dataTableTriplesWithLabels: PropTypes.arrayOf(PropTypes.shape).isRequired,
  updateStoreValue: PropTypes.func.isRequired,
  globalEdgeStyling: PropTypes.shape().isRequired,
  userDefinedEdgeStyling: PropTypes.shape().isRequired,
  globalNodeStyling: PropTypes.shape().isRequired,
  userDefinedNodeStyling: PropTypes.shape().isRequired,
}

const mapToProps = ({
  dataTableTriples,
  globalEdgeStyling,
  userDefinedEdgeStyling,
  globalNodeStyling,
  userDefinedNodeStyling,
  dataTableTriplesWithLabels
}) => ({
  dataTableTriples,
  globalEdgeStyling,
  userDefinedEdgeStyling,
  globalNodeStyling,
  userDefinedNodeStyling,
  dataTableTriplesWithLabels
})

export default connect(
  mapToProps,
  actions
)(DataTableNetwork)
