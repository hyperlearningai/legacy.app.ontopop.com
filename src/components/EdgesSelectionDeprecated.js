import { useState, useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import EdgesSelectionDetails from './EdgesSelectionDetails'
import { SIDEBAR_VIEW_EDGES_SELECTION } from '../constants/views'
import { getEdgeUniqueId } from '../constants/functions'

const EdgesSelection = ({
  removeFromArray,
  objectPropertiesFromApi,
  selectedEdges,
  resetSelectedEdges
}) => {
  const { t } = useTranslation()

  const [isEdgeSelected, toggleEdgeSelected] = useState(false)
  const [edgeId, setEdgeId] = useState('')

  useEffect(() => () => resetSelectedEdges(), [])

  return (
    <>
      <div className="sidebar-main-title">
        {!isEdgeSelected
          ? t(SIDEBAR_VIEW_EDGES_SELECTION)
          : (
            <>
              <Button
                tooltip={t('goBack')}
                onClick={() => toggleEdgeSelected(false)}
                icon="pi pi-chevron-left"
                iconPos="left"
              />
              {`${t('edge')}: ${objectPropertiesFromApi[edgeId].rdfsLabel}`}
            </>
          )}
      </div>
      {!isEdgeSelected ? (
        <div className="edges-selection">
          {
            selectedEdges.length > 0
              ? selectedEdges.map((selectedEdge) => {
                const edgeUniqueId = getEdgeUniqueId(selectedEdge)

                const { rdfsLabel } = objectPropertiesFromApi[edgeUniqueId]

                return (
                  <div
                    className="edges-selection-row"
                    key={`selected-edge-row-${selectedEdge}`}
                  >
                    <div className="edges-selection-row-delete">
                      <Button
                        tooltip={`${t('removeEdge')}: ${rdfsLabel}`}
                        onClick={() => removeFromArray('selectedEdges', selectedEdge)}
                        icon="pi pi-times"
                      />
                    </div>

                    <div className="edges-selection-row-main">
                      <Button
                        tooltip={`${t('viewEdge')}: ${rdfsLabel}`}
                        onClick={() => {
                          setEdgeId(edgeUniqueId)
                          toggleEdgeSelected(true)
                        }}
                        label={rdfsLabel}
                        icon="pi pi-chevron-right"
                        iconPos="right"
                      />
                    </div>
                  </div>
                )
              }) : (
                <div className="edges-selection-message">
                  {t('selectEdgeFromGraph')}
                </div>
              )
          }
        </div>
      ) : (
        <EdgesSelectionDetails
          edgeId={edgeId}
        />
      )}
    </>
  )
}

EdgesSelection.propTypes = {
  resetSelectedEdges: PropTypes.func.isRequired,
  selectedEdges: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeFromArray: PropTypes.func.isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
}

const mapToProps = ({
  selectedEdges,
  objectPropertiesFromApi
}) => ({
  selectedEdges,
  objectPropertiesFromApi
})

export default connect(
  mapToProps,
  actions
)(EdgesSelection)
