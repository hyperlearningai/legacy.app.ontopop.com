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

const FreeTextSearch = ({
  classesFromApi,
  freeTextSelection,
  freeTextSelectedElement,
  objectPropertiesFromApi,
  removeFromObject,
  setStoreState,
  stylingNodeCaptionProperty,
  stylingEdgeCaptionProperty
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
            const elementType = freeTextSelection[elementId]

            const elementLabel = elementType === 'node'
              ? classesFromApi[elementId][stylingNodeCaptionProperty]
              : objectPropertiesFromApi[elementId][stylingEdgeCaptionProperty]

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

                      if (elementId === freeTextSelectedElement) setStoreState('freeTextSelectedElement', '')
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
  classesFromApi: PropTypes.shape().isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
  stylingNodeCaptionProperty: PropTypes.string.isRequired,
  stylingEdgeCaptionProperty: PropTypes.string.isRequired,
}

const mapToProps = ({
  freeTextSelection,
  freeTextSelectedElement,
  classesFromApi,
  objectPropertiesFromApi,
  stylingNodeCaptionProperty,
  stylingEdgeCaptionProperty
}) => ({
  freeTextSelection,
  freeTextSelectedElement,
  classesFromApi,
  objectPropertiesFromApi,
  stylingNodeCaptionProperty,
  stylingEdgeCaptionProperty
})

export default connect(
  mapToProps,
  actions
)(FreeTextSearch)
