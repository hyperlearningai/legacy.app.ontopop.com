/* eslint jsx-a11y/label-has-associated-control:0 */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { connect } from 'redux-zero/react'
import { SelectButton } from 'primereact/selectbutton'
import { Divider } from 'primereact/divider'
import { InputText } from 'primereact/inputtext'
import { orderBy, uniq } from 'lodash'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { MultiSelect } from 'primereact/multiselect'
import Joyride from 'react-joyride'
import { SIDEBAR_VIEW_NOTES, SIDEBAR_VIEW_SYNONYMS } from '../constants/views'
import actions from '../store/actions'
import NotesListNote from './NotesListNote'
import NotesListAddNew from './NotesListAddNew'
import addNodesBorders from '../utils/networkStyling/addNodesBorders'
import { SORT_FIELDS, MIN_DATE } from '../constants/notes'
import getEdgeIds from '../utils/nodesEdgesUtils/getEdgeIds'
import getEdge from '../utils/nodesEdgesUtils/getEdge'
import { OPERATION_TYPE_UPDATE } from '../constants/store'
import updateHighlightedElement from '../utils/networkStyling/updateHighlightedElement'
import { ROUTE_SYNONYMS } from '../constants/routes'
import setPageView from '../utils/analytics/setPageView'

const NotesList = ({
  notes,
  nodesNotes,
  edgesNotes,
  updateStoreValue,
  selectedNotesType,
  noteElementId,
  classesFromApi,
  nodesDropdownLabels,
  showTour
}) => {
  const { t } = useTranslation()

  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState('dateLastUpdated')
  const [sortDirection, setSortDirection] = useState('asc')
  const [filter, setFilter] = useState(undefined)
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    addNodesBorders()

    return () => {
      addNodesBorders()
    }
  }, [])

  const filterNode = (note) => {
    if (search === '' && !filter) return true

    if (filter === 'dateCreated' && new Date(note.dateCreated) < filterValue) return false

    if (filter === 'dateLastUpdated' && new Date(note.dateLastUpdated) < filterValue) return false

    if (filter === 'userId' && !filterValue.includes(note.userId)) return false

    return search === '' ? true : note.contents && note.contents.toLowerCase().includes(search.toLowerCase())
  }

  let userIdNotes = notes

  let filteredNotes = notes.length > 0 ? notes.filter((note) => filterNode(note)) : []

  if (selectedNotesType === 'node') {
    const nodesNotesById = nodesNotes.length > 0 && noteElementId ? nodesNotes.filter((note) => note.nodeId.toString() === noteElementId.toString()) : []
    filteredNotes = nodesNotesById
    userIdNotes = nodesNotesById

    if (filteredNotes.length > 0) {
      filteredNotes = filteredNotes.filter((note) => filterNode(note))
    }
  }

  if (selectedNotesType === 'edge') {
    const edgesNotesById = edgesNotes.length > 0 && noteElementId ? edgesNotes.filter((note) => note.edgeId.toString() === noteElementId.toString()) : []
    filteredNotes = edgesNotesById
    userIdNotes = edgesNotesById

    if (filteredNotes.length > 0) {
      filteredNotes = filteredNotes.filter((note) => filterNode(note))
    }
  }

  const userIds = userIdNotes.length > 0 ? uniq(userIdNotes.map((note) => note.userId)).map((userId) => ({
    value: userId,
    label: userId
  })) : []

  const noteButtons = [{
    value: 'graph',
    label: t('graph')
  }, {
    value: 'node',
    label: t('node')
  }, {
    value: 'edge',
    label: t('edge')
  }]

  const itemTemplate = (option) => (
    <span className="notes-type-select-option">
      {`${option.label}`}
    </span>
  )

  const availableNodesList = nodesDropdownLabels.filter((node) => node.label)

  const availableEdgesList = getEdgeIds().map((edgeId) => {
    const {
      id, label, from, to
    } = getEdge(edgeId)

    const edgeLabel = `${classesFromApi[from].label} => ${label} => ${classesFromApi[to].label}`

    return ({
      value: id,
      label: edgeLabel
    })
  }).filter((edge) => edge.label)

  const steps = [
    {
      target: '#notes-select',
      content: t('introNotesType'),
      placement: 'top',
      disableBeacon: true
    },
    {
      target: '#notes-select-element',
      content: t('introNotesElement'),
      placement: 'top',
      disableBeacon: true
    }
  ]

  const handleJoyrideCallback = (data) => {
    const { status, index } = data

    if (index === 1) {
      updateStoreValue(['isNodeSelectable'], OPERATION_TYPE_UPDATE, true)
      updateStoreValue(['isEdgeSelectable'], OPERATION_TYPE_UPDATE, false)
      updateStoreValue(['noteElementId'], OPERATION_TYPE_UPDATE, undefined)
      updateStoreValue(['selectedNotesType'], OPERATION_TYPE_UPDATE, 'node')
    }

    if (index === 2) {
      updateHighlightedElement({
        updateStoreValue,
        id: '2',
        type: selectedNotesType
      })
    }

    if (status === 'finished') {
      localStorage.setItem('showTour', JSON.stringify({ ...showTour, notes: false }))
      updateStoreValue(['sidebarView'], OPERATION_TYPE_UPDATE, SIDEBAR_VIEW_SYNONYMS)
      window.history.pushState('', '', ROUTE_SYNONYMS)
      setPageView({ url: ROUTE_SYNONYMS, updateStoreValue })
    }
  }

  return (
    <>
      {showTour.notes && (
      <Joyride
        callback={handleJoyrideCallback}
        steps={steps}
        disableScrolling
        locale={{ close: t('next') }}
      />
      )}

      <h1 className="sidebar-main-title">
        {t(SIDEBAR_VIEW_NOTES)}
      </h1>

      <div className="sidebar-main-body notes">
        <div className="notes-select-row">
          <label
            className="sidebar-main-body-label text-center m-b-10"
            htmlFor="notes-select"
          >
            {t('notesFor')}
          </label>
          <SelectButton
            id="notes-select"
            value={selectedNotesType}
            options={noteButtons}
            onChange={(e) => {
              const { value } = e

              updateStoreValue(['isNodeSelectable'], OPERATION_TYPE_UPDATE, value === 'node')
              updateStoreValue(['isEdgeSelectable'], OPERATION_TYPE_UPDATE, value === 'edge')
              updateStoreValue(['noteElementId'], OPERATION_TYPE_UPDATE, undefined)
              updateStoreValue(['selectedNotesType'], OPERATION_TYPE_UPDATE, value)
            }}
            itemTemplate={itemTemplate}
          />
        </div>

        {
          selectedNotesType !== 'graph' && (
            <div className="notes-select-row m-b-20">
              <label
                className="sidebar-main-body-label text-center m-t-50 m-b-10"
                htmlFor="notes-select-element"
              >
                {t('selectElement')}
              </label>
              <Dropdown
                aria-label="notes-select-element"
                id="notes-select-element"
                name="notes-select-element"
                value={noteElementId}
                options={
                  selectedNotesType === 'node'
                    ? availableNodesList
                    : availableEdgesList
                }
                onChange={(e) => updateHighlightedElement({
                  updateStoreValue,
                  id: e.value,
                  type: selectedNotesType,
                })}
              />
            </div>
          )
        }

        <Divider />

        <div className="sidebar-main-body-title m-t-20 text-center">
          {t('availableNotes')}
        </div>

        {
          (
            selectedNotesType === 'graph' || (
              selectedNotesType !== 'graph'
            && noteElementId)
          ) && (
            <NotesListAddNew />
          )
        }

        {
          (
            selectedNotesType === 'graph' || (
              selectedNotesType !== 'graph'
            && noteElementId)
          ) && (
            <div className="notes-list">
              <div className="notes-accordion-row">
                <Accordion id="notes-filter">
                  <AccordionTab header={t('advancedOptions')}>
                    <div className="p-input-icon-right notes-list-search-input m-t-10">
                      <i className="pi pi-search" />
                      <InputText
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t('search')}
                        id="notes-search-filter"
                        className="full-width"
                      />
                    </div>

                    <div className="notes-select-row">
                      <label
                        className="sidebar-main-body-label text-center m-t-30 m-b-10"
                        htmlFor="notes-select"
                      >
                        {t('sortBy')}
                      </label>
                      <div className="p-inputgroup">
                        <Dropdown
                          aria-label="notes-sort-by"
                          id="notes-sort-by"
                          value={sortField}
                          options={SORT_FIELDS.map((field) => ({
                            value: field,
                            label: t(field)
                          }))}
                          onChange={(e) => setSortField(e.value)}
                        />
                        <Button
                          aria-label={t(sortDirection === 'asc' ? 'ascending' : 'descending')}
                          id="notes-sort-by-direction"
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
                        htmlFor="notes-filter-field"
                      >
                        {t('filterBy')}
                      </label>
                      <Dropdown
                        aria-label="notes-filter-field"
                        id="notes-filter-field"
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
                        <div className="notes-select-row">
                          <label
                            className="sidebar-main-body-label text-center m-t-20 m-b-10"
                            htmlFor="notes-select"
                          >
                            {t('selectUserIds')}
                          </label>
                          <MultiSelect
                            id="notes-filter-user"
                            value={filterValue}
                            filter
                            options={userIds}
                            onChange={(e) => setFilterValue(e.value)}
                          />
                        </div>
                      )
                    }

                    {(
                      filter === 'dateCreated'
                    || filter === 'dateLastUpdated'
                    ) && (
                      <div className="notes-select-row">
                        <Calendar
                          minDate={new Date(MIN_DATE)}
                          maxDate={new Date()}
                          value={filterValue || MIN_DATE}
                          onChange={(e) => setFilterValue(e.value)}
                          inline
                        />
                      </div>
                    )}

                  </AccordionTab>
                </Accordion>
              </div>

              {
                filteredNotes.length > 0
                  ? orderBy(filteredNotes, [sortField], [sortDirection]).map((note) => (
                    <NotesListNote
                      key={`note-card-${note.id}`}
                      note={note}
                    />
                  )) : (
                    <div className="sidebar-main-body-info no-notes-message m-t-20 text-center">
                      {t('noNotesPresent')}
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

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  nodesNotes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  edgesNotes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  noteElementId: PropTypes.string,
  selectedNotesType: PropTypes.string.isRequired,
  updateStoreValue: PropTypes.func.isRequired,
  classesFromApi: PropTypes.shape().isRequired,
  nodesDropdownLabels: PropTypes.arrayOf(PropTypes.shape).isRequired,
  showTour: PropTypes.shape().isRequired,
}

NotesList.defaultProps = {
  noteElementId: undefined,
}

const mapToProps = ({
  notes,
  selectedNotesType,
  nodesNotes,
  edgesNotes,
  noteElementId,
  classesFromApi,
  nodesDropdownLabels,
  showTour
}) => ({
  notes,
  selectedNotesType,
  nodesNotes,
  edgesNotes,
  noteElementId,
  classesFromApi,
  nodesDropdownLabels,
  showTour
})

export default connect(
  mapToProps,
  actions
)(NotesList)
