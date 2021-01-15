import { useState, useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  BsChevronRight,
} from 'react-icons/bs'
import {
  ImCross
} from 'react-icons/im'
import {
  FaArrowLeft
} from 'react-icons/fa'
import actions from '../store/actions'
import EdgesSelectionDetails from './EdgesSelectionDetails'
import { SIDEBAR_VIEW_EDGES_SELECTION } from '../constants/views'

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
              <button
                type="button"
                title={t('goBack')}
                onClick={() => toggleEdgeSelected(false)}
              >
                <FaArrowLeft />
              </button>
              {`${t('edge')}: ${objectPropertiesFromApi[edgeId].rdfsLabel}`}
            </>
          )}
      </div>
      {!isEdgeSelected ? (
        <div className="edges-selection">
          {
            selectedEdges.length > 0
              ? selectedEdges.map((selectedEdge) => {
                const edgeUniqueId = selectedEdge.split('___')[0]

                const { rdfsLabel } = objectPropertiesFromApi[edgeUniqueId]

                return (
                  <div
                    className="edges-selection-row"
                    key={`selected-edge-row-${selectedEdge}`}
                  >
                    <div className="edges-selection-row-delete">
                      <button
                        type="button"
                        title={t('removeSelectedEdge')}
                        onClick={() => removeFromArray('selectedEdges', selectedEdge)}
                      >
                        <ImCross />
                      </button>
                    </div>

                    <div className="edges-selection-row-main">
                      <button
                        type="button"
                        title={t('viewEdge')}
                        onClick={() => {
                          setEdgeId(edgeUniqueId)
                          toggleEdgeSelected(true)
                        }}
                      >
                        <span>
                          {rdfsLabel}
                        </span>
                        <BsChevronRight />
                      </button>
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
