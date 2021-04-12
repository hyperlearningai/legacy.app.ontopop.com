/* eslint react/no-array-index-key:0 */
import {
  useEffect,
  useState,
} from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { SelectButton } from 'primereact/selectbutton'
import actions from '../store/actions'
import setFilteredNodes from '../utils/nodesFilter/setFilteredNodes'
import setFilteredEdges from '../utils/edgesFilter/setFilteredEdges'
import { OPERATION_TYPE_UPDATE } from '../constants/store'
import { EDGE_PROPERTIES_DROPDOWN } from '../constants/graph'

const ElementsFilter = ({
  updateStoreValue,
  annotationProperties,
}) => {
  const { t } = useTranslation()

  useEffect(() => () => {
    updateStoreValue(['isElementSelectable'], OPERATION_TYPE_UPDATE, false)
  }, [])

  const defaultElementFilter = {
    property: '',
    value: '',
  }

  // const checkEmptyRow = (filters) => filters.filter((filter) => filter.property === '' && filter.value === '').length > 0

  const [elementsFilters, setElementsFilters] = useState([defaultElementFilter])
  const [selectedElementType, selectElementType] = useState('node')

  const elementTypeButtons = [{
    value: 'node',
    label: t('node')
  }, {
    value: 'edge',
    label: t('edge')
  }]

  const itemTemplate = (option) => (
    <span>
      {`${option.label}`}
    </span>
  )

  return (
    <>
      <h1 className="sidebar-main-title">
        {selectedElementType === 'node' ? t('nodesFilter') : t('edgesFilter')}
      </h1>
      <div className="elements-selection-select-row">
        <SelectButton
          id="element-type-select"
          value={selectedElementType}
          options={elementTypeButtons}
          onChange={(e) => {
            const { value } = e
            selectElementType(value)
            setElementsFilters([defaultElementFilter])
          }}
          itemTemplate={itemTemplate}
        />
      </div>

      <div className="elements-filter">
        <div>
          {selectedElementType === 'node'
            ? t('filterNodesByArbitraryPropsCombination')
            : t('filterEdgesByArbitraryPropsCombination')}
        </div>

        <div
          className="elements-filter-selection"
        >
          {
            elementsFilters.map(
              (nodefilter, index) => {
                const selectId = `${selectedElementType}s-filter-property-${index}`
                const inputTextId = `${selectedElementType}s-filter-value-${index}`

                return (
                  <div
                    className="elements-filter-selection-row"
                    key={`${selectedElementType}s-filter-${index}`}
                  >
                    <div className="p-field p-col-12">
                      <label htmlFor={selectId}>{t('selectProperty')}</label>
                      <Dropdown
                        aria-label="select-element"
                        id={selectId}
                        value={elementsFilters[index].property}
                        options={selectedElementType === 'node' ? annotationProperties : EDGE_PROPERTIES_DROPDOWN}
                        filter
                        onChange={(e) => {
                          const newElementsFilters = [...elementsFilters]
                          newElementsFilters[index].property = e.value
                          setElementsFilters(newElementsFilters)
                        }}
                        className="m-t-10"
                        placeholder={t('selectProperty')}
                      />
                    </div>

                    <div className="p-field p-col-12 m-t-20">
                      <label htmlFor={inputTextId}>{t('searchString')}</label>
                      <InputText
                        id={inputTextId}
                        value={elementsFilters[index].value}
                        placeholder={t('searchString')}
                        onChange={(e) => {
                          const newFilter = {
                            ...elementsFilters[index],
                            value: e.target.value
                          }

                          setElementsFilters([
                            ...elementsFilters.slice(0, index),
                            newFilter,
                            ...elementsFilters.slice(index + 1)
                          ])
                        }}
                        className="m-t-10"
                      />
                    </div>

                    <div className="m-t-10">
                      <div className="network-styling-property-form-row">
                        <span className="p-buttonset add-delete-buttons">
                          <Button
                            disabled={index === 0}
                            label={t('delete')}
                            tooltip={t('delete')}
                            tooltipOptions={{
                              position: 'top'
                            }}
                            className="p-button-warning delete-property"
                            onClick={() => {
                              const newElementFilter = elementsFilters.slice()
                              newElementFilter.splice(index, 1)
                              setElementsFilters(newElementFilter)
                            }}
                          />

                          <Button
                            id="elements-filter-add"
                            label={t('add')}
                            className="add-property"
                            onClick={() => {
                              const newElementsFilters = [
                                ...elementsFilters,
                                defaultElementFilter
                              ]
                              setElementsFilters(newElementsFilters)
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                )
              }
            )
          }
        </div>

        <Button
          aria-label={t('show')}
          tooltip={selectedElementType === 'node' ? t('showFilteredNodes') : t('showFilteredEdges')}
          className="elements-filter-button m-t-30"
          disabled={elementsFilters.length < 2}
          icon="pi pi-chevron-right"
          iconPos="right"
          label={t('show')}
          onClick={() => {
            if (selectedElementType === 'node') {
              const nodesFilters = elementsFilters
              setFilteredNodes({
                updateStoreValue,
                nodesFilters
              })
            } else {
              const edgesFilters = elementsFilters
              setFilteredEdges({
                updateStoreValue,
                edgesFilters
              })
            }
          }}
        />
      </div>
    </>
  )
}

ElementsFilter.propTypes = {
  updateStoreValue: PropTypes.func.isRequired,
  annotationProperties: PropTypes.arrayOf(PropTypes.shape).isRequired,
}

const mapToProps = ({
  annotationProperties
}) => ({
  annotationProperties
})

export default connect(
  mapToProps,
  actions
)(ElementsFilter)
