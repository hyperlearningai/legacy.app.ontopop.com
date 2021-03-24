/* eslint react/no-array-index-key:0 */
import { useEffect, useRef, useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { SelectButton } from 'primereact/selectbutton'
import actions from '../store/actions'
import { SIDEBAR_VIEW_STRUCTURED_SEARCH } from '../constants/views'
import structuredSearchElement from '../utils/structuredSearch/structuredSearchElement'
import highlightStructuredSearchElement from '../utils/structuredSearch/highlightStructuredSearchElement'
import clearStructuredSearchElement from '../utils/structuredSearch/clearStructuredSearchElement'
import getElementLabel from '../utils/networkStyling/getElementLabel'
import { OPERATION_TYPE_DELETE, OPERATION_TYPE_UPDATE } from '../constants/store'

const StructuredSearch = ({
  structuredSelection,
  structuredSelectedElement,
  updateStoreValue,
  annotationProperties,
}) => {
  const { t } = useTranslation()
  const isInitialMount = useRef(true)

  const defaultNodeFilter = {
    property: '',
    value: '',
  }

  const checkEmptyRow = (filters) => filters.filter((filter) => filter.property === '' && filter.value === '').length > 0

  const [filters, setFilters] = useState([defaultNodeFilter])
  const [queryLogic, setQueryLogic] = useState('and')

  useEffect(() => () => {
    clearStructuredSearchElement()

    updateStoreValue(['structuredSelection'], OPERATION_TYPE_UPDATE, {})
    updateStoreValue(['structuredSelectedElement'], OPERATION_TYPE_UPDATE, '')
    updateStoreValue(['structuredPrevSelectedElement'], OPERATION_TYPE_UPDATE, undefined)
  }, [])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      clearStructuredSearchElement()

      highlightStructuredSearchElement({
        updateStoreValue,
      })
    }
  }, [structuredSelectedElement])

  const logicButtons = [{
    value: 'and',
    label: t('and'),
    icon: 'pi-plus'
  }, {
    value: 'or',
    label: t('or'),
    icon: 'pi-minus'
  }]

  const itemTemplate = (option) => (
    <span className="structured-search-selection-row-select-option">
      <i className={`pi ${option.icon}`} />
      {` ${option.label}`}
    </span>
  )

  return (
    <>
      <div className="sidebar-main-title">
        {
          structuredSelection
          && Object.keys(structuredSelection).length > 0
            ? (
              <Button
                icon="pi pi-arrow-left"
                tooltip={t('goBack')}
                onClick={() => {
                  clearStructuredSearchElement()

                  updateStoreValue(['structuredSelection'], OPERATION_TYPE_UPDATE, undefined)
                }}
              />
            ) : ''
        }
        {t(SIDEBAR_VIEW_STRUCTURED_SEARCH)}
      </div>
      <div className="structured-search">
        {
          structuredSelection
          && Object.keys(structuredSelection).length > 0 ? (
            <>
              <div className="structured-search-text">{`${t('elementsFound')}: ${structuredSelection ? Object.keys(structuredSelection).length : 0}`}</div>

              <div className="structured-search-results">
                {
                  Object.keys(structuredSelection).length > 0
                  && Object.keys(structuredSelection).map((elementId) => {
                    const {
                      type,
                      from,
                      to
                    } = structuredSelection[elementId]

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
                        className={`structured-search-results-row ${elementId === structuredSelectedElement ? 'structured-search-results-row-selected' : ''}`}
                        key={`structured-search-results-row-${elementId}`}
                      >
                        <div className="structured-search-results-row-delete">
                          <Button
                            tooltip={`${t('removeGraph')}: ${elementId}`}
                            onClick={() => {
                              updateStoreValue(['structuredSelection', elementId], OPERATION_TYPE_DELETE)

                              if (elementId === structuredSelectedElement) updateStoreValue(['structuredSelectedElement'], OPERATION_TYPE_UPDATE, '')
                            }}
                            icon="pi pi-times"
                          />

                        </div>

                        <div className="structured-search-results-row-main">
                          <Button
                            tooltip={`${t('focusElement')}: ${elementLabel}`}
                            disabled={elementId === structuredSelectedElement}
                            onClick={() => updateStoreValue(['structuredSelectedElement'], OPERATION_TYPE_UPDATE, elementId)}
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
            ) : (
              <>
                <div className="structured-search-text">{t('filterElementsByArbitraryPropsCombination')}</div>

                <div
                  className="structured-search-select-button"
                >
                  <label htmlFor="logic-select">
                    {t('chooseLogic')}
                  </label>
                  <SelectButton
                    id="logic-select"
                    value={queryLogic}
                    options={logicButtons}
                    onChange={(e) => setQueryLogic(e.value)}
                    itemTemplate={itemTemplate}
                  />
                </div>

                <div
                  className="structured-search-selection"
                >
                  {
                    filters.map(
                      (nodefilter, index) => {
                        const selectId = `structured-search-property-${index}`
                        const inputTextId = `structured-search-value-${index}`

                        return (
                          <div
                            className="structured-search-selection-row"
                            key={`structured-search-${index}`}
                          >
                            {
                              filters.length > 1 && (
                                <div className="p-field remove-button p-col-12">
                                  <Button
                                    icon="pi pi-times"
                                    className="p-button-rounded p-button-danger"
                                    tooltip={t('removeFilter')}
                                    onClick={() => {
                                      const newNodeFilter = filters.slice()

                                      newNodeFilter.splice(index, 1)

                                      if (!checkEmptyRow(newNodeFilter)) {
                                        newNodeFilter.push(JSON.parse(JSON.stringify(defaultNodeFilter)))
                                      }

                                      setFilters(newNodeFilter)
                                    }}
                                  />
                                </div>
                              )
                            }

                            <div className="p-field p-col-12">
                              <label htmlFor={selectId}>{t('selectProperty')}</label>
                              <Dropdown
                                id={selectId}
                                value={filters[index].property}
                                options={annotationProperties}
                                filter
                                onChange={(e) => {
                                  const newFilter = {
                                    ...filters[index],
                                    property: e.value
                                  }

                                  let newNodesFilters = [
                                    ...filters.slice(0, index),
                                    newFilter,
                                    ...filters.slice(index + 1),
                                  ]

                                  if (!checkEmptyRow(newNodesFilters)) {
                                    newNodesFilters = [
                                      ...newNodesFilters,
                                      JSON.parse(JSON.stringify(defaultNodeFilter))
                                    ]
                                  }

                                  setFilters(newNodesFilters)
                                }}
                                className="m-t-10"
                                placeholder={t('selectProperty')}
                              />
                            </div>

                            <div className="p-field p-col-12 m-t-20">
                              <label htmlFor={inputTextId}>{t('searchString')}</label>
                              <InputText
                                id={inputTextId}
                                value={filters[index].value}
                                placeholder={t('searchString')}
                                onChange={(e) => {
                                  const newFilter = {
                                    ...filters[index],
                                    value: e.target.value
                                  }

                                  setFilters([
                                    ...filters.slice(0, index),
                                    newFilter,
                                    ...filters.slice(index + 1)
                                  ])
                                }}
                                className="m-t-10"
                              />
                            </div>
                          </div>
                        )
                      }
                    )
                  }
                </div>

                <div className="structured-search-button-wrapper">
                  <Button
                    tooltip={t('showFilteredNodes')}
                    className="structured-search-button m-t-30"
                    disabled={filters.length < 2}
                    icon="pi pi-chevron-right"
                    iconPos="right"
                    label={t('show')}
                    onClick={() => structuredSearchElement({
                      filters,
                      queryLogic,
                      updateStoreValue,
                    })}
                  />
                </div>

                <div className="structured-search-text-lower">
                  {`${t('elementsFound')}: ${structuredSelection ? Object.keys(structuredSelection).length : 0}`}
                </div>
              </>
            )
        }
      </div>
    </>
  )
}

StructuredSearch.propTypes = {
  updateStoreValue: PropTypes.func.isRequired,
  structuredSelection: PropTypes.shape().isRequired,
  structuredSelectedElement: PropTypes.string.isRequired,
  annotationProperties: PropTypes.arrayOf(PropTypes.shape).isRequired,
}

const mapToProps = ({
  structuredSelection,
  structuredSelectedElement,
  annotationProperties,
}) => ({
  structuredSelection,
  structuredSelectedElement,
  annotationProperties,
})

export default connect(
  mapToProps,
  actions
)(StructuredSearch)
