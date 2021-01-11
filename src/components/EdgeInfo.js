import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs'
import {
  ImCross
} from 'react-icons/im'
import _ from 'lodash'
import actions from '../store/actions'
import EdgeInfoDetails from './EdgeInfoDetails'

const EdgeInfo = ({
  selectedEdges,
  objectPropertiesFromApi,
  removeFromArray
}) => {
  const { t } = useTranslation()

  const { OwlObjectProperties } = objectPropertiesFromApi

  const [view, setView] = useState('')
  const [edgeId, setEdgeId] = useState('')

  const relatedEdges = {}

  const uniqueSelectedEdgesIds = selectedEdges.map((selectedEdge) => {
    const mainEdgeId = selectedEdge.split('___')[0]

    if (relatedEdges[mainEdgeId]) {
      relatedEdges[mainEdgeId].push(selectedEdge)
    } else {
      relatedEdges[mainEdgeId] = [selectedEdge]
    }

    return mainEdgeId
  })

  return (
    <div className="edge-info">
      <div className="edge-info-navbar">
        <div className="edge-info-navbar-button">
          {
            view !== '' && (
              <button
                type="button"
                title={t('goBack')}
                onClick={() => setView('')}
              >
                <BsChevronLeft />
              </button>
            )
          }
        </div>

        {
          view !== ''
            ? OwlObjectProperties[edgeId].rdfsLabel
            : t('selectedEdges')
        }
      </div>

      <div className="edge-info-body">
        {
          view === ''
            ? _.uniq(uniqueSelectedEdgesIds).map((edgeMainId) => {
              const selectedEdgeInfo = OwlObjectProperties[edgeMainId]

              if (!selectedEdgeInfo) return null

              const { rdfsLabel } = selectedEdgeInfo

              return (
                <div
                  className="edge-info-body-row"
                  key={`selected-edge-row-${edgeMainId}`}
                >
                  <button
                    type="button"
                    title={t('removeSelectedEdge')}
                    onClick={() => relatedEdges[edgeMainId].map((edge) => removeFromArray('selectedEdges', edge))}
                  >
                    <ImCross />
                  </button>
                  <span>
                    {rdfsLabel}
                  </span>
                  <button
                    type="button"
                    title={t('viewEdge')}
                    onClick={() => {
                      setEdgeId(edgeMainId)
                      setView('edge')
                    }}
                  >
                    <BsChevronRight />
                  </button>
                </div>
              )
            }) : (
              <EdgeInfoDetails
                edgeId={edgeId}
              />
            )
        }
      </div>
    </div>
  )
}

EdgeInfo.propTypes = {
  selectedEdges: PropTypes.arrayOf(PropTypes.string).isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
  removeFromArray: PropTypes.func.isRequired,
}

const mapToProps = ({
  selectedEdges,
  objectPropertiesFromApi,
  deletedEdges
}) => ({
  selectedEdges,
  objectPropertiesFromApi,
  deletedEdges
})

export default connect(
  mapToProps,
  actions
)(EdgeInfo)
