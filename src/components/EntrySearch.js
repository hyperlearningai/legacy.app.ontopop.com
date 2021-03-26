import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { SelectButton } from 'primereact/selectbutton'
import { Checkbox } from 'primereact/checkbox'
import { useEffect, useState } from 'react'
import { MultiSelect } from 'primereact/multiselect'
import actions from '../store/actions'

const EntrySearch = ({
  entrySearchFilter,
  setStoreState,
  annotationProperties,
  entrySearchAnnotationProperties
}) => {
  const { t } = useTranslation()

  const [isAdvancedSearch, toggleAdvancedSearch] = useState(false)

  useEffect(() => {
    if (annotationProperties.length > 0) {
      setStoreState(
        'entrySearchAnnotationProperties',
        annotationProperties.map((property) => property.value)
      )
    }
  }, [annotationProperties])

  const filterOptions = [{
    label: t('all'),
    value: 'all'
  }, {
    label: t('nodes'),
    value: 'nodes'
  }, {
    label: t('edges'),
    value: 'edges'
  }]

  return (
    <>
      <h1 className="sidebar-main-title">
        {t('advancedSearchOptions')}
      </h1>

      <div className="entry-search">
        <div
          className="entry-search-row"
        >
          <label htmlFor="filter-select">
            {t('resultsType')}
          </label>
          <SelectButton
            id="filter-select"
            value={entrySearchFilter}
            options={filterOptions}
            onChange={(e) => setStoreState('entrySearchFilter', e.value)}
          />
        </div>

        <div className="entry-search-row entry-search-row-checkbox">
          <Checkbox
            inputId="advanced-search"
            onChange={() => toggleAdvancedSearch(!isAdvancedSearch)}
            checked={isAdvancedSearch}
          />
          <label
            htmlFor="advanced-search"
            className="p-checkbox-label"
          >
            {t('showAdvancedSearch')}
          </label>
        </div>

        {
          isAdvancedSearch && (
            <div
              className="entry-search-row"
            >
              <label htmlFor="search-field">{t('selectProperty')}</label>
              <MultiSelect
                id="search-field"
                value={entrySearchAnnotationProperties}
                options={annotationProperties}
                filter
                onChange={(e) => setStoreState('entrySearchAnnotationProperties', e.value)}
                className="m-t-10"
                placeholder={t('selectProperty')}
              />
            </div>
          )
        }
      </div>
    </>
  )
}

EntrySearch.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  entrySearchFilter: PropTypes.string.isRequired,
  annotationProperties: PropTypes.arrayOf(PropTypes.shape).isRequired,
  entrySearchAnnotationProperties: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const mapToProps = ({
  entrySearchFilter,
  annotationProperties,
  entrySearchAnnotationProperties
}) => ({
  entrySearchFilter,
  annotationProperties,
  entrySearchAnnotationProperties
})

export default connect(
  mapToProps,
  actions
)(EntrySearch)
