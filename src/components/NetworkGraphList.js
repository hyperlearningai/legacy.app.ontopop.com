import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import Joyride from 'react-joyride'
import actions from '../store/actions'
import { NETWORK_VIEW_DATATABLE, SIDEBAR_VIEW_GRAPHS } from '../constants/views'
import { OPERATION_TYPE_DELETE, OPERATION_TYPE_UPDATE } from '../constants/store'

const NetworkGraphList = ({
  updateStoreValue,
  currentGraph,
  graphData,
  showTour
}) => {
  const { t } = useTranslation()

  const graphViewsKeys = Object.keys(graphData)

  const steps = [
    {
      target: '.vis-up',
      content: 'Use buttons to navigate',
      placement: 'top',
      disableBeacon: true
    },
    {
      target: '#navbar-datatable-btn',
      content: 'See database',
      placement: 'bottom',
      disableBeacon: true
    }
  ]

  const handleJoyrideCallback = (data) => {
    const { status } = data

    if (status === 'finished') {
      localStorage.setItem('showTour', JSON.stringify({ ...showTour, navigate: false }))
      updateStoreValue(['networkVisualisation'], OPERATION_TYPE_UPDATE, NETWORK_VIEW_DATATABLE)
    }
  }

  return (
    <>
      {showTour.navigate && (
      <Joyride
        callback={handleJoyrideCallback}
        steps={steps}
        disableScrolling
        locale={{ close: 'Next' }}
      />
      )}
      <h1 className="sidebar-main-title">
        {t(SIDEBAR_VIEW_GRAPHS)}
      </h1>
      <div className="network-graph-list">
        {
          graphViewsKeys.map((graphViewsKey, index) => {
            const { label, noDelete } = graphData[graphViewsKey]

            return (
              <div
                className={`network-graph-list-row ${currentGraph === graphViewsKey ? 'network-graph-list-row-selected' : ''}`}
                key={`selected-node-row-${graphViewsKey}`}
              >
                <div className="network-graph-list-row-delete">
                  {
                    !noDelete && (
                      <Button
                        id={`remove-graph-${index}`}
                        aria-label={t('removeGraph')}
                        tooltip={`${t('removeGraph')}: ${label}`}
                        onClick={() => {
                          if (currentGraph === graphViewsKey) {
                            updateStoreValue(['currentGraph'], OPERATION_TYPE_UPDATE, 'graph-0')
                          }

                          updateStoreValue(['graphData', graphViewsKey], OPERATION_TYPE_DELETE)
                        }}
                        icon="pi pi-times"
                      />
                    )
                  }
                </div>

                <div className="network-graph-list-row-main">
                  <Button
                    aria-label={`${t('viewGraph')}: ${label}`}
                    disabled={currentGraph === graphViewsKey}
                    onClick={() => updateStoreValue(['currentGraph'], OPERATION_TYPE_UPDATE, graphViewsKey)}
                    label={label}
                    icon="pi pi-chevron-right"
                    iconPos="right"
                  />
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

NetworkGraphList.propTypes = {
  updateStoreValue: PropTypes.func.isRequired,
  graphData: PropTypes.shape().isRequired,
  currentGraph: PropTypes.string.isRequired,
  showTour: PropTypes.shape().isRequired,
}

const mapToProps = ({
  graphData,
  currentGraph,
  showTour
}) => ({
  graphData,
  currentGraph,
  showTour
})

export default connect(
  mapToProps,
  actions
)(NetworkGraphList)
