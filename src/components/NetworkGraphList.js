import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import { SIDEBAR_VIEW_GRAPHS } from '../constants/views'

const NetworkGraphList = ({
  setStoreState,
  removeFromObject,
  currentGraph,
  graphData
}) => {
  const { t } = useTranslation()

  const graphViewsKeys = Object.keys(graphData)

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_GRAPHS)}
      </div>
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
                        aria-label={t('removeGraph')}
                        tooltip={`${t('removeGraph')}: ${label}`}
                        onClick={() => {
                          if (currentGraph === graphViewsKey) {
                            setStoreState('currentGraph', 'graph-0')
                          }

                          removeFromObject('graphData', graphViewsKey)
                        }}
                        icon="pi pi-times"
                      />
                    )
                  }
                </div>

                <div className="network-graph-list-row-main">
                  <Button
                    aria-label={t('viewGraph')}
                    tooltip={`${t('viewGraph')}: ${label}`}
                    disabled={currentGraph === graphViewsKey}
                    onClick={() => setStoreState('currentGraph', graphViewsKey)}
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
  setStoreState: PropTypes.func.isRequired,
  graphData: PropTypes.shape().isRequired,
  removeFromObject: PropTypes.func.isRequired,
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
