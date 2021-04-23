/* eslint jsx-a11y/label-has-associated-control:0 */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { connect } from 'redux-zero/react'
import { Divider } from 'primereact/divider'
import { InputText } from 'primereact/inputtext'
import { orderBy, uniq } from 'lodash'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { MultiSelect } from 'primereact/multiselect'
import Joyride from 'react-joyride'
import { SIDEBAR_VIEW_EDIT_ONTOLOGY, SIDEBAR_VIEW_SYNONYMS } from '../constants/views'
import actions from '../store/actions'
import { MIN_DATE, SORT_FIELDS } from '../constants/synonyms'
import getNode from '../utils/nodesEdgesUtils/getNode'
import SynonymsListAddNew from './SynonymsListAddNew'
import synonymsGetSynonyms from '../utils/synonyms/synonymsGetSynonyms'
import SynonymsListNode from './SynonymsListNode'
import { NODE_TYPE } from '../constants/graph'
import updateHighlightedElement from '../utils/networkStyling/updateHighlightedElement'
import { getElementIdAndType } from '../constants/functions'
import { ROUTE_EDIT_ONTOLOGY } from '../constants/routes'
import { OPERATION_TYPE_UPDATE } from '../constants/store'
import setPageView from '../utils/analytics/setPageView'

const SynonymsList = ({
  nodesSynonyms,
  updateStoreValue,
  selectedElement,
  classesFromApi,
  showTour
}) => {
  const { t } = useTranslation()

  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState('dateLastUpdated')
  const [sortDirection, setSortDirection] = useState('asc')
  const [filter, setFilter] = useState(undefined)
  const [filterValue, setFilterValue] = useState('')

  let synonymElementId

  const [elementId, type] = getElementIdAndType(selectedElement)

  if (elementId && type === 'node') {
    synonymElementId = elementId
  }

  useEffect(() => {
    const [newElementId, newType] = getElementIdAndType(selectedElement)

    if (newElementId && newType === 'node') {
      synonymsGetSynonyms({
        selectedElement: newElementId,
        updateStoreValue,
        t
      })
    }
  }, [selectedElement])

  const filterNode = (synonymObject) => {
    if (search === '' && !filter) return true

    if (filter === 'dateCreated' && new Date(synonymObject.dateCreated) < filterValue) return false

    if (filter === 'dateLastUpdated' && new Date(synonymObject.dateLastUpdated) < filterValue) return false

    if (filter === 'userId' && !filterValue.includes(synonymObject.userId)) return false

    return search === '' ? true : synonymObject.synonym && synonymObject.synonym.toLowerCase().includes(search.toLowerCase())
  }

  const nodesSynonymsById = nodesSynonyms.length > 0 && synonymElementId ? nodesSynonyms.filter((synonym) => synonym.nodeId.toString() === synonymElementId.toString()) : []
  let filteredSynonyms = nodesSynonymsById
  const userIdSynonyms = nodesSynonymsById

  if (filteredSynonyms.length > 0) {
    filteredSynonyms = filteredSynonyms.filter((synonym) => filterNode(synonym))
  }

  const userIds = userIdSynonyms.length > 0 ? uniq(userIdSynonyms.map((synonym) => synonym.userId)).map((userId) => ({
    value: userId,
    label: userId
  })) : []

  const availableNodesList = getNode({
    filter: (node) => classesFromApi[node.id][NODE_TYPE]
      && classesFromApi[node.id][NODE_TYPE] === 'class'
  }).map((node) => {
    const { id, label } = node

    return ({
      value: id,
      label
    })
  }).filter((node) => node.label)

  const steps = [
    {
      target: '#synonyms-select-element',
      content: t('introSynonymsElement'),
      placement: 'top',
      disableBeacon: true
    },
    {
      target: '.sidebar-main-body-title',
      content: t('introSynonymsSynonyms'),
      placement: 'bottom',
      disableBeacon: true
    }
  ]

  const handleJoyrideCallback = (data) => {
    const { status, index } = data

    if (index === 1) {
      updateHighlightedElement({
        updateStoreValue,
        id: '12',
        type: 'node'
      })
    }

    if (status === 'finished') {
      localStorage.setItem('showTour', JSON.stringify({ ...showTour, synonyms: false }))
      updateStoreValue(['sidebarView'], OPERATION_TYPE_UPDATE, SIDEBAR_VIEW_EDIT_ONTOLOGY)
      window.history.pushState('', '', ROUTE_EDIT_ONTOLOGY)
      setPageView({ url: ROUTE_EDIT_ONTOLOGY, updateStoreValue })
    }
  }

  return (
    <>
      {showTour.synonyms && (
      <Joyride
        callback={handleJoyrideCallback}
        steps={steps}
        disableScrolling
        locale={{ close: 'Next' }}
      />
      )}

      <h1 className="sidebar-main-title">
        {t(SIDEBAR_VIEW_SYNONYMS)}
      </h1>

      <div className="sidebar-main-body synonyms">
        <div className="synonyms-select-row">
          <label
            className="sidebar-main-body-label m-b-10"
            htmlFor="synonyms-select-element"
          >
            {t('selectElement')}
          </label>
          <Dropdown
            aria-label="synonyms-select-element"
            id="synonyms-select-element"
            name="synonyms-select-element"
            value={synonymElementId}
            options={availableNodesList}
            onChange={(e) => updateHighlightedElement({
              updateStoreValue,
              id: e.value,
              type: 'node',
            })}
          />
        </div>

        <Divider />

        <div className="sidebar-main-body-title m-t-20 text-center">
          {t('availableSynonyms')}
        </div>

        {
          synonymElementId && (
            <SynonymsListAddNew />
          )
        }

        {
          synonymElementId && (
            <div className="synonyms-list">
              <div className="synonyms-accordion-row">
                <Accordion id="synonyms-filter">
                  <AccordionTab header={t('advancedOptions')}>
                    <div className="p-input-icon-right synonyms-list-search-input m-t-10">
                      <i className="pi pi-search" />
                      <InputText
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t('search')}
                        id="synonyms-search-filter"
                      />
                    </div>

                    <div className="synonyms-select-row">
                      <label
                        className="sidebar-main-body-label text-center m-t-30 m-b-10"
                        htmlFor="synonyms-select"
                      >
                        {t('sortBy')}
                      </label>
                      <div className="p-inputgroup">
                        <Dropdown
                          aria-label="synonyms-sort-by"
                          id="synonyms-sort-by"
                          value={sortField}
                          options={SORT_FIELDS.map((field) => ({
                            value: field,
                            label: t(field)
                          }))}
                          onChange={(e) => setSortField(e.value)}
                        />
                        <Button
                          aria-label="synonyms-sort-by-direction"
                          id="synonyms-sort-by-direction"
                          tooltip={t(sortDirection === 'asc' ? 'ascending' : 'descending')}
                          tooltipOptions={{ position: 'top' }}
                          icon={sortDirection === 'asc' ? 'pi pi-arrow-down' : 'pi pi-arrow-up'}
                          onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                        />
                      </div>
                    </div>

                    <div className="notes-select-row m-b-10">
                      <label
                        className="sidebar-main-body-label text-center m-t-30 m-b-10"
                        htmlFor="synonyms-filter-field"
                      >
                        {t('filterBy')}
                      </label>
                      <Dropdown
                        aria-label="synonyms-filter-field"
                        id="synonyms-filter-field"
                        value={filter}
                        options={SORT_FIELDS.map((field) => ({
                          value: field,
                          label: t(field)
                        }))}
                        onChange={(e) => {
                          setFilterValue('')
                          setFilter(e.value)
                        }}
                      />
                    </div>

                    {
                      filter === 'userId' && (
                        <div className="synonyms-select-row">
                          <label
                            className="sidebar-main-body-label text-center m-t-20 m-b-10"
                            htmlFor="synonyms-select"
                          >
                            {t('selectUserIds')}
                          </label>
                          <MultiSelect
                            id="synonyms-filter-user"
                            value={filterValue}
                            filter
                            options={userIds}
                            onChange={(e) => setFilterValue(e.value)}
                          />
                        </div>
                      )
                    }

                    {
                      (
                        filter === 'dateCreated'
                        || filter === 'dateLastUpdated'
                      ) && (
                        <div className="synonyms-select-row">
                          <Calendar
                            minDate={new Date(MIN_DATE)}
                            maxDate={new Date()}
                            value={filterValue || MIN_DATE}
                            onChange={(e) => setFilterValue(e.value)}
                            inline
                          />
                        </div>
                      )
                    }
                  </AccordionTab>
                </Accordion>
              </div>

              {
                filteredSynonyms.length > 0
                  ? orderBy(filteredSynonyms, [sortField], [sortDirection]).map((synonym) => (
                    <SynonymsListNode
                      key={`synonym-card-${synonym.id}`}
                      synonymObject={synonym}
                    />
                  )) : (
                    <div className="sidebar-main-body-info m-t-20 text-center" id="no-synonyms-message">
                      {t('noSynonymsPresent')}
                    </div>
                  )
              }
            </div>
          )
        }
      </div>
    </>
  )
}

SynonymsList.propTypes = {
  nodesSynonyms: PropTypes.arrayOf(PropTypes.shape).isRequired,
  updateStoreValue: PropTypes.func.isRequired,
  selectedElement: PropTypes.shape(),
  classesFromApi: PropTypes.shape().isRequired,
  showTour: PropTypes.shape().isRequired,
}

SynonymsList.defaultProps = {
  selectedElement: undefined
}

const mapToProps = ({
  nodesSynonyms,
  selectedElement,
  classesFromApi,
  showTour
}) => ({
  nodesSynonyms,
  selectedElement,
  classesFromApi,
  showTour
})

export default connect(
  mapToProps,
  actions
)(SynonymsList)
