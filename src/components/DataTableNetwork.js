import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useEffect } from 'react'
import Joyride from 'react-joyride'
import actions from '../store/actions'
import setDataTableTriplesLabels from '../utils/dataTableNetwork/setDataTableTriplesLabels'
import { ROUTE_ELEMENTS_SELECTION } from '../constants/routes'
import setPageView from '../utils/analytics/setPageView'
import { OPERATION_TYPE_UPDATE } from '../constants/store'
import { SIDEBAR_VIEW_ELEMENTS_SELECTION } from '../constants/views'

const DataTableNetwork = ({
  dataTableTriples,
  dataTableTriplesWithLabels,
  globalEdgeStyling,
  userDefinedEdgeStyling,
  globalNodeStyling,
  userDefinedNodeStyling,
  updateStoreValue,
  showTour
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

  const steps = [
    {
      target: '#sidebar-button-elements-selection',
      content: t('introDatabaseSection'),
      placement: 'right',
      disableBeacon: true
    }
  ]

  const handleJoyrideCallback = (data) => {
    const { status } = data

    if (status === 'finished') {
      localStorage.setItem('showTour', JSON.stringify({ ...showTour, database: false }))
      updateStoreValue(['sidebarView'], OPERATION_TYPE_UPDATE, SIDEBAR_VIEW_ELEMENTS_SELECTION)
      window.history.pushState('', '', ROUTE_ELEMENTS_SELECTION)
      setPageView({ url: ROUTE_ELEMENTS_SELECTION, updateStoreValue })
    }
  }

  return (
    <div className="p-p-3 datatable-container elevate-view">
      {showTour.database && (
      <Joyride
        callback={handleJoyrideCallback}
        steps={steps}
        disableScrolling
        locale={{ close: t('next') }}
      />
      )}
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
  showTour: PropTypes.shape().isRequired,
}

const mapToProps = ({
  dataTableTriples,
  globalEdgeStyling,
  userDefinedEdgeStyling,
  globalNodeStyling,
  userDefinedNodeStyling,
  dataTableTriplesWithLabels,
  showTour
}) => ({
  dataTableTriples,
  globalEdgeStyling,
  userDefinedEdgeStyling,
  globalNodeStyling,
  userDefinedNodeStyling,
  dataTableTriplesWithLabels,
  showTour
})

export default connect(
  mapToProps,
  actions
)(DataTableNetwork)
