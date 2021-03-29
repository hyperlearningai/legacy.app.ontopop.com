import { useEffect, useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import actions from '../store/actions'
import { SIDEBAR_VIEW_FREE_TEXT_SEARCH } from '../constants/views'
import searchElement from '../utils/freeTextSearch/searchElement'
import clearElement from '../utils/freeTextSearch/clearElement'
import getElementLabel from '../utils/networkStyling/getElementLabel'
import { OPERATION_TYPE_DELETE, OPERATION_TYPE_UPDATE } from '../constants/store'
import updateHighlightedElement from '../utils/networkStyling/updateHighlightedElement'

const FreeTextSearch = ({
  freeTextSelection,
  selectedElement,
  updateStoreValue,
}) => {
  const { t } = useTranslation()

  const [search, setSearch] = useState('')
  useEffect(() => () => {
    updateStoreValue(['freeTextSelection'], OPERATION_TYPE_UPDATE, {})
  }, [])

  return (
    <>
      <h1 className="sidebar-main-title">
        {t(SIDEBAR_VIEW_FREE_TEXT_SEARCH)}
      </h1>

      <div className="p-input-icon-right freetext-search-input">
        <i className="pi pi-search" />
        <InputText
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            clearElement()

            searchElement({
              search: e.target.value,
              updateStoreValue
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
              type, from, to
            } = freeTextSelection[elementId]

            let elementLabel

            if (type === 'node') {
              elementLabel = getElementLabel({
                type: 'node',
                id: elementId
              })
            } else {
              const edgeLabel = getElementLabel({
                type: 'edge',
                id: elementId
              })

              const fromNodeLabel = getElementLabel({
                type: 'node',
                id: from
              })

              const toNodeLabel = getElementLabel({
                type: 'node',
                id: to
              })

              elementLabel = `${fromNodeLabel} => ${edgeLabel} => ${toNodeLabel}`
            }

            return (
              <div
                className={`freetext-search-row ${elementId === selectedElement ? 'freetext-search-row-selected' : ''}`}
                key={`freetext-search-row-${elementId}`}
              >
                <div className="freetext-search-row-delete">
                  <Button
                    aria-label={t('removeGraph')}
                    tooltip={`${t('removeGraph')}: ${elementId}`}
                    onClick={() => {
                      updateStoreValue(['freeTextSelection', elementId], OPERATION_TYPE_DELETE)

                      if (elementId === selectedElement) {
                        clearElement()

                        updateStoreValue(['freeTextSelectedElement'], OPERATION_TYPE_UPDATE, '')
                      }
                    }}
                    icon="pi pi-times"
                  />

                </div>

                <div className="freetext-search-row-main">
                  <Button
                    aria-label={t('focusElement')}
                    tooltip={`${t('focusElement')}: ${elementLabel}`}
                    disabled={elementId === selectedElement}
                    onClick={() => updateHighlightedElement({
                      updateStoreValue,
                      id: elementId,
                      type
                    })}
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
  updateStoreValue: PropTypes.func.isRequired,
  freeTextSelection: PropTypes.shape().isRequired,
  selectedElement: PropTypes.shape(),
}

FreeTextSearch.defaultProps = {
  selectedElement: undefined
}

const mapToProps = ({
  freeTextSelection,
  selectedElement
}) => ({
  freeTextSelection,
  selectedElement
})

export default connect(
  mapToProps,
  actions
)(FreeTextSearch)
