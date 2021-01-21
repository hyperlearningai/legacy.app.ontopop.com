import { useEffect, useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import actions from '../store/actions'
import { SIDEBAR_VIEW_FREE_TEXT_SEARCH } from '../constants/views'
import searchElement from '../utils/searchElement'
import {
  NODE_BACKGROUND,
} from '../constants/graph'
import focusNode from '../utils/focusNode'
import highlightEdge from '../utils/highlightEdge'
import resetSearchSelection from '../utils/resetSearchSelection'

const FreeTextSearch = ({
  availableEdges,
  availableEdgesNormalised,
  availableNodes,
  classesFromApi,
  edgesIdsToDisplay,
  freeTextSelection,
  freeTextSelectedElement,
  network,
  nodesIdsToDisplay,
  objectPropertiesFromApi,
  removeFromObject,
  setStoreState,
}) => {
  const { t } = useTranslation()

  const [search, setSearch] = useState('')
  const [prevSelectedNode, setPrevSelectedNode] = useState('')
  const [prevSelectedEdges, setPrevSelectedEdges] = useState([])

  useEffect(() => () => searchElement({
    search: '',
    nodesIdsToDisplay,
    edgesIdsToDisplay,
    classesFromApi,
    objectPropertiesFromApi,
    setStoreState
  }), [])

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_FREE_TEXT_SEARCH)}
      </div>

      <div className="p-input-icon-right freetext-search-input">
        <i className="pi pi-search" />
        <InputText
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            searchElement({
              search: e.target.value,
              nodesIdsToDisplay,
              edgesIdsToDisplay,
              classesFromApi,
              objectPropertiesFromApi,
              setStoreState
            })
          }}
          placeholder={t('search')}
        />
      </div>

      <div className="freetext-search">
        {
          Object.keys(freeTextSelection).length > 0
          && Object.keys(freeTextSelection).map((elementId) => {
            const elementType = freeTextSelection[elementId]

            const elementLabel = elementType === 'node'
              ? classesFromApi[elementId].rdfsLabel
              : objectPropertiesFromApi[elementId].rdfsLabel

            return (
              <div
                className={`freetext-search-row ${elementId === freeTextSelectedElement ? 'freetext-search-row-selected' : ''}`}
                key={`freetext-search-row-${elementId}`}
              >
                <div className="freetext-search-row-delete">

                  <Button
                    tooltip={`${t('removeGraph')}: ${elementId}`}
                    onClick={() => {
                      if (elementType === 'node') {
                        availableNodes.update(
                          [{ id: elementId, color: { background: NODE_BACKGROUND } }]
                        )
                      }

                      removeFromObject('freeTextSelection', elementId)
                    }}
                    icon="pi pi-times"
                  />

                </div>

                <div className="freetext-search-row-main">
                  <Button
                    tooltip={`${t('focusElement')}: ${elementLabel}`}
                    disabled={elementId === freeTextSelectedElement}
                    onClick={() => {
                      resetSearchSelection({
                        availableEdges,
                        availableNodes,
                        prevSelectedEdges,
                        setPrevSelectedEdges,
                        prevSelectedNode,
                        setPrevSelectedNode,
                      })

                      if (elementType === 'edge') {
                        return highlightEdge({
                          setPrevSelectedEdges,
                          availableEdges,
                          availableEdgesNormalised,
                          elementId,
                          setStoreState,
                          network
                        })
                      }

                      return focusNode({
                        setPrevSelectedNode,
                        availableNodes,
                        network,
                        elementId,
                        setStoreState
                      })
                    }}
                  >
                    <span>
                      <i className={`pi pi-${elementType === 'node' ? 'circle-off' : 'arrow-up'}`} />
                      {' '}
                      {elementLabel}
                    </span>
                    <i className="pi pi-chevron-right" />
                  </Button>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

FreeTextSearch.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  removeFromObject: PropTypes.func.isRequired,
  freeTextSelection: PropTypes.shape().isRequired,
  freeTextSelectedElement: PropTypes.string.isRequired,
  availableNodes: PropTypes.shape().isRequired,
  availableEdges: PropTypes.shape().isRequired,
  availableEdgesNormalised: PropTypes.shape().isRequired,
  classesFromApi: PropTypes.shape().isRequired,
  network: PropTypes.shape().isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
  nodesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
  edgesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const mapToProps = ({
  freeTextSelection,
  freeTextSelectedElement,
  classesFromApi,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  edgesIdsToDisplay,
  network,
  availableNodes,
  availableEdges,
  availableEdgesNormalised
}) => ({
  freeTextSelection,
  freeTextSelectedElement,
  classesFromApi,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  edgesIdsToDisplay,
  network,
  availableNodes,
  availableEdges,
  availableEdgesNormalised
})

export default connect(
  mapToProps,
  actions
)(FreeTextSearch)
