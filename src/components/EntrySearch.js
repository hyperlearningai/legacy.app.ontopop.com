/* eslint jsx-a11y/label-has-associated-control:0  */
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { RadioButton } from 'primereact/radiobutton'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { useState } from 'react'
import { ListBox } from 'primereact/listbox'
import actions from '../store/actions'
import { OPERATION_TYPE_DELETE, OPERATION_TYPE_OBJECT_ADD, OPERATION_TYPE_UPDATE } from '../constants/store'
import SearchBar from './SearchBar'
import { ADVANCED_SEARCH_TEMPLATE, ENUMERATION_PROPERTIES, PROPERTYIES_TO_EXCLUDE_FROM_ADVANCED_SEARCH } from '../constants/search'
import getEnumeration from '../utils/graphSearch/getEnumeration'
import searchGraph from '../utils/graphSearch/searchGraph'

const EntrySearch = ({
  dataTypeSearch,
  upperOntologySearch,
  updateStoreValue,
  annotationProperties,
  advancedSearchFilters,
  isFirstQuery
}) => {
  const { t } = useTranslation()

  const [suggestions, setSuggestions] = useState([])

  const dataTypeOptions = [{
    label: t('any'),
    value: 'any'
  }, {
    label: t('dataEntity'),
    value: 'class'
  }, {
    label: t('dataset'),
    value: 'dataset'
  }]

  const ontologyTypeOptions = [{
    label: t('any'),
    value: 'any'
  }, {
    label: t('upperOntology'),
    value: 'true'
  }, {
    label: t('lowerOntology'),
    value: 'false'
  }]

  const searchFilterKeys = Object.keys(advancedSearchFilters)
  const maxSearchFilterKey = Math.max(searchFilterKeys)

  return (
    <>
      <h1 className="sidebar-main-title">
        {t('search')}
      </h1>

      <div className="sidebar-main-body entry-search">
        {
          !isFirstQuery && (
            <div
              className="entry-search-row"
            >
              <SearchBar />
            </div>
          )
        }

        <div
          className="sidebar-main-body-title"
        >
          {t('searchFilters')}
        </div>

        <div
          className="sidebar-main-body-subtitle"
        >
          {t('resultType')}
        </div>

        <div className="entry-search-row">
          {
            dataTypeOptions.map((option) => (
              <div
                key={`data-type-option-${option.value}`}
                className="p-field-radiobutton"
              >
                <RadioButton
                  id={`data-type-option-${option.value}`}
                  name="data-type-option"
                  value={option.value}
                  onChange={() => updateStoreValue(['dataTypeSearch'], OPERATION_TYPE_UPDATE, option.value)}
                  checked={dataTypeSearch === option.value}
                />
                <label htmlFor={`data-type-option-${option.value}`}>{option.label}</label>
              </div>
            ))
          }
        </div>

        <div
          className="sidebar-main-body-subtitle"
        >
          {t('topology')}
        </div>

        <div className="entry-search-row">
          {
            ontologyTypeOptions.map((option) => (
              <div
                key={`data-type-option-${option.value}`}
                className="p-field-radiobutton"
              >
                <RadioButton
                  id={`ontology-type-option-${option.value}`}
                  name="data-type-option"
                  value={option.value}
                  onChange={() => updateStoreValue(['upperOntologySearch'], OPERATION_TYPE_UPDATE, option.value)}
                  checked={upperOntologySearch === option.value}
                />
                <label htmlFor={`data-type-option-${option.value}`}>{option.label}</label>
              </div>
            ))
          }
        </div>

        <Accordion>
          <AccordionTab
            header={t('advancedSearch')}
          >
            {
              searchFilterKeys.map((searchFilterKey) => {
                const {
                  property,
                  value
                } = advancedSearchFilters[searchFilterKey]

                const isWithEnumeration = ENUMERATION_PROPERTIES.includes(property)

                const enumerationSuggestions = suggestions && suggestions.length > 0
                  ? suggestions.filter((suggestion) => suggestion.value.toLowerCase().includes(value.toLowerCase()))
                  : []

                const diplayedEnumerationSuggestions = enumerationSuggestions.length === 1
                  && enumerationSuggestions[0].value === value
                  ? []
                  : enumerationSuggestions

                return (
                  <div
                    key={`advanced-search-${searchFilterKey}`}
                    className="entry-search-block p-pt-3 p-pb-3 p-d-flex p-ai-center"
                  >
                    <div className="p-d-flex p-flex-column">
                      <div className="entry-search-block-row m-b-5">
                        <Dropdown
                          id={`advanced-search-property-${searchFilterKey}`}
                          value={property}
                          options={
                            annotationProperties && annotationProperties.length > 0
                              ? annotationProperties.filter((prop) => !PROPERTYIES_TO_EXCLUDE_FROM_ADVANCED_SEARCH.includes(prop.value))
                              : []
                          }
                          filter
                          onChange={(e) => {
                            const selectedValue = e.value

                            if (ENUMERATION_PROPERTIES.includes(selectedValue)) {
                              getEnumeration({
                                property: selectedValue,
                                setSuggestions,
                                updateStoreValue,
                                t
                              })
                            }

                            updateStoreValue(['advancedSearchFilters', searchFilterKey], OPERATION_TYPE_OBJECT_ADD, { property: selectedValue })
                          }}
                          placeholder={t('selectProperty')}
                        />
                      </div>

                      <div className="entry-search-block-row">
                        <InputText
                          className="property-text-input value-input"
                          id={`advanced-search-value-${searchFilterKey}`}
                          value={value}
                          placeholder={t('insertTextOrSelect')}
                          onChange={(e) => updateStoreValue(['advancedSearchFilters', searchFilterKey], OPERATION_TYPE_OBJECT_ADD, { value: e.target.value })}
                        />
                        {
                          isWithEnumeration
                          && diplayedEnumerationSuggestions.length > 0 && (
                            <ListBox
                              value={value}
                              options={diplayedEnumerationSuggestions}
                              onChange={(e) => updateStoreValue(['advancedSearchFilters', searchFilterKey], OPERATION_TYPE_OBJECT_ADD, { value: e.value })}
                            />
                          )
                        }
                      </div>
                    </div>

                    <div className="p-d-flex p-flex-column">
                      <Button
                        icon="pi pi-plus"
                        className="p-m-1"
                        id={`advanced-search-plus-${searchFilterKey}`}
                        aria-label={t('add')}
                        tooltip={t('add')}
                        onClick={() => updateStoreValue(['advancedSearchFilters'], OPERATION_TYPE_OBJECT_ADD, { [maxSearchFilterKey + 1]: JSON.parse(JSON.stringify(ADVANCED_SEARCH_TEMPLATE)) })}
                      />

                      <Button
                        icon="pi pi-minus"
                        className="p-m-1"
                        id={`advanced-search-minus-${searchFilterKey}`}
                        aria-label={t('remove')}
                        tooltip={t('remove')}
                        onClick={() => {
                          if (searchFilterKeys.length > 1) {
                            return updateStoreValue(['advancedSearchFilters', searchFilterKey], OPERATION_TYPE_DELETE)
                          }

                          updateStoreValue(['advancedSearchFilters'], OPERATION_TYPE_UPDATE, {})
                          return updateStoreValue(['advancedSearchFilters'], OPERATION_TYPE_UPDATE, { 0: JSON.parse(JSON.stringify(ADVANCED_SEARCH_TEMPLATE)) })
                        }}
                      />
                    </div>
                  </div>
                )
              })
            }
          </AccordionTab>
        </Accordion>

        <div
          className="entry-search-row"
        >
          <Button
            icon="pi pi-search"
            iconPos="right"
            id="apply-filters-btn"
            aria-label={t('search')}
            label={t('search')}
            className="sidebar-button-primary"
            onClick={() => {
              updateStoreValue(['searchPageSelected'], OPERATION_TYPE_UPDATE, 0)

              searchGraph({
                updateStoreValue,
                t
              })
            }}
          />
        </div>
      </div>
    </>
  )
}

EntrySearch.propTypes = {
  dataTypeSearch: PropTypes.string.isRequired,
  upperOntologySearch: PropTypes.string.isRequired,
  updateStoreValue: PropTypes.func.isRequired,
  advancedSearchFilters: PropTypes.shape().isRequired,
  annotationProperties: PropTypes.arrayOf(PropTypes.shape).isRequired,
  isFirstQuery: PropTypes.bool.isRequired,
}

const mapToProps = ({
  dataTypeSearch,
  upperOntologySearch,
  advancedSearchFilters,
  annotationProperties,
  isFirstQuery
}) => ({
  dataTypeSearch,
  upperOntologySearch,
  advancedSearchFilters,
  annotationProperties,
  isFirstQuery
})

export default connect(
  mapToProps,
  actions
)(EntrySearch)
