import { useEffect, useRef, useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import actions from '../store/actions'
import { SIDEBAR_VIEW_FREE_TEXT_SEARCH } from '../constants/views'
import searchElement from '../utils/freeTextSearch/searchElement'
import clearElement from '../utils/freeTextSearch/clearElement'
import highlightElement from '../utils/freeTextSearch/highlightElement'
import getNode from '../utils/nodesEdgesUtils/getNode'

const FreeTextSearch = ({
  classesFromApi,
  freeTextSelection,
  freeTextSelectedElement,
  objectPropertiesFromApi,
  removeFromObject,
  setStoreState,
  globalEdgeStyling,
  userDefinedEdgeStyling,
  globalNodeStyling,
  userDefinedNodeStyling,
}) => {
  const { t } = useTranslation()
  const isInitialMount = useRef(true)

  const [search, setSearch] = useState('')
  useEffect(() => () => {
    clearElement()

    setStoreState('freeTextSelection', {})
    setStoreState('freeTextSelectedElement', '')
    setStoreState('freeTextPrevSelectedElement', undefined)
  }, [])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      clearElement()

      highlightElement({
        setStoreState,
      })
    }
  }, [freeTextSelectedElement])

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
            clearElement()

            searchElement({
              search: e.target.value,
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
            const {
              type, userDefined, from, to
            } = freeTextSelection[elementId]

            let elementLabel

            if (type === 'node') {
              const { stylingNodeCaptionProperty } = userDefined ? userDefinedNodeStyling : globalNodeStyling
              elementLabel = classesFromApi[elementId][stylingNodeCaptionProperty]
            } else {
              const { stylingEdgeCaptionProperty } = userDefined ? userDefinedEdgeStyling : globalEdgeStyling
              const edge = objectPropertiesFromApi[elementId][stylingEdgeCaptionProperty]

              const fromNode = getNode(from)
              const fromNodeLabel = fromNode[fromNode.userDefined ? userDefinedNodeStyling.stylingNodeCaptionProperty : globalNodeStyling.stylingNodeCaptionProperty]

              const toNode = getNode(to)
              const toNodeLabel = toNode[toNode.userDefined ? userDefinedNodeStyling.stylingNodeCaptionProperty : globalNodeStyling.stylingNodeCaptionProperty]

              elementLabel = `${fromNodeLabel} => ${edge} => ${toNodeLabel}`
            }

            return (
              <div
                className={`freetext-search-row ${elementId === freeTextSelectedElement ? 'freetext-search-row-selected' : ''}`}
                key={`freetext-search-row-${elementId}`}
              >
                <div className="freetext-search-row-delete">
                  <Button
                    tooltip={`${t('removeGraph')}: ${elementId}`}
                    onClick={() => {
                      removeFromObject('freeTextSelection', elementId)

                      if (elementId === freeTextSelectedElement) {
                        clearElement()

                        setStoreState('freeTextSelectedElement', '')
                      }
                    }}
                    icon="pi pi-times"
                  />

                </div>

                <div className="freetext-search-row-main">
                  <Button
                    tooltip={`${t('focusElement')}: ${elementLabel}`}
                    disabled={elementId === freeTextSelectedElement}
                    onClick={() => setStoreState('freeTextSelectedElement', elementId)}
                  >
                    <span>
                      <i className={`pi pi-${type === 'node' ? 'circle-off' : 'arrow-up'}`} />
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
  classesFromApi: PropTypes.shape().isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
  globalEdgeStyling: PropTypes.shape().isRequired,
  userDefinedEdgeStyling: PropTypes.shape().isRequired,
  globalNodeStyling: PropTypes.shape().isRequired,
  userDefinedNodeStyling: PropTypes.shape().isRequired,
}

const mapToProps = ({
  freeTextSelection,
  freeTextSelectedElement,
  classesFromApi,
  objectPropertiesFromApi,
  stylingNodeCaptionProperty,
  stylingEdgeCaptionProperty,
  globalEdgeStyling,
  userDefinedEdgeStyling,
  globalNodeStyling,
  userDefinedNodeStyling,
}) => ({
  freeTextSelection,
  freeTextSelectedElement,
  classesFromApi,
  objectPropertiesFromApi,
  stylingNodeCaptionProperty,
  stylingEdgeCaptionProperty,
  globalEdgeStyling,
  userDefinedEdgeStyling,
  globalNodeStyling,
  userDefinedNodeStyling,
})

export default connect(
  mapToProps,
  actions
)(FreeTextSearch)
