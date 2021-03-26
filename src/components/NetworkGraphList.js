import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import { SIDEBAR_VIEW_GRAPHS } from '../constants/views'
import { OPERATION_TYPE_DELETE, OPERATION_TYPE_UPDATE } from '../constants/store'

const NetworkGraphList = ({
  updateStoreValue,
  currentGraph,
  graphData
}) => {
  const { t } = useTranslation()

  const graphViewsKeys = Object.keys(graphData)

  return (
    <>
      <h1 className="sidebar-main-title">
        {t(SIDEBAR_VIEW_GRAPHS)}
      </h1>
      <div className="network-graph-list">
        {
          graphViewsKeys.map((graphViewsKey) => {
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
                        ariaLabel={t('removeGraph')}
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
                    ariaLabel={t('viewGraph')}
                    tooltip={`${t('viewGraph')}: ${label}`}
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
}

const mapToProps = ({
  graphData,
  currentGraph
}) => ({
  graphData,
  currentGraph
})

export default connect(
  mapToProps,
  actions
)(NetworkGraphList)
