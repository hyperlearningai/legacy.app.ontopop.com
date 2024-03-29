import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useEffect } from 'react'
import Joyride from 'react-joyride'
import actions from '../store/actions'
import setDataTableTriplesLabels from '../utils/dataTableNetwork/setDataTableTriplesLabels'
import { OPERATION_TYPE_OBJECT_ADD } from '../constants/store'
import { IS_SHOW_TOUR_VISIBLE } from '../constants/views'

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
      content: t('introDatatableSection'),
      placement: 'right',
      disableBeacon: true
    }
  ]

  const handleJoyrideCallback = (data) => {
    const { status } = data

    if (status === 'finished') {
      localStorage.setItem('showTour', JSON.stringify({ ...showTour, datatable: 'false' }))
      updateStoreValue(['showTour'], OPERATION_TYPE_OBJECT_ADD, { datatable: 'false' })
      document.getElementById('sidebar-button-elements-selection').click()
    }
  }

  return (
    <div className="p-p-3 datatable-container elevate-view">
      {
        (
          IS_SHOW_TOUR_VISIBLE
          && showTour.datatable !== 'false'
        ) && (
          <Joyride
            callback={handleJoyrideCallback}
            steps={steps}
            disableScrolling
            locale={{ close: t('next') }}
            styles={{
              options: { primaryColor: '#011e41' }
            }}
          />
        )
      }
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
