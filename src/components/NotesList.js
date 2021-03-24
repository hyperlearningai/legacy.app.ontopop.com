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
import { SIDEBAR_VIEW_NOTES } from '../constants/views'
import actions from '../store/actions'
import setNodesStyle from '../utils/networkStyling/setNodesStyle'
import highlightSelectedNode from '../utils/nodesSelection/highlightSelectedNode'
import NotesListNote from './NotesListNote'
import NotesListAddNew from './NotesListAddNew'
import addNodesBorders from '../utils/networkStyling/addNodesBorders'
import { SORT_FIELDS, MIN_DATE } from '../constants/notes'
import getNodeIds from '../utils/nodesEdgesUtils/getNodeIds'
import getEdgeIds from '../utils/nodesEdgesUtils/getEdgeIds'
import getNode from '../utils/nodesEdgesUtils/getNode'
import getEdge from '../utils/nodesEdgesUtils/getEdge'
import setEdgesStyle from '../utils/networkStyling/setEdgesStyle'
import highlightSelectedEdge from '../utils/edgesSelection/highlightSelectedEdge'
import { OPERATION_TYPE_UPDATE } from '../constants/store'

const NotesList = ({
  notes,
  nodesNotes,
  edgesNotes,
  updateStoreValue,
  selectedNotesType,
  noteElementId,
  classesFromApi
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
      updateStoreValue(['noteElementId'], OPERATION_TYPE_UPDATE, undefined)
      updateStoreValue(['noteElementId'], OPERATION_TYPE_UPDATE, undefined)

      setNodesStyle()
      setEdgesStyle()

      addNodesBorders()
    }
  }, [])

  useEffect(() => {
    if (selectedNotesType === 'node' && noteElementId && noteElementId !== '') {
      setNodesStyle()

      highlightSelectedNode({
        updateStoreValue,
        selectedNode: noteElementId
      })
    }

    if (selectedNotesType === 'edge' && noteElementId && noteElementId !== '') {
      setEdgesStyle()

      highlightSelectedEdge({
        updateStoreValue,
        selectedEdge: noteElementId
      })
    }
  }, [noteElementId, selectedNotesType])

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

  const availableNodesList = getNodeIds().map((nodeId) => {
    const node = getNode(nodeId)

    return ({
      value: node.id,
      label: node.label
    })
  }).filter((node) => node.label)

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

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_NOTES)}
      </div>

      <div className="notes">
        <div className="notes-select-row">
          <label htmlFor="notes-select">
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
            <div className="notes-select-row">
              <label htmlFor="notes-select-element">
                {t('selectElement')}
              </label>
              <Dropdown
                id="notes-select-element"
                name="notes-select-element"
                value={noteElementId}
                options={
                  selectedNotesType === 'node'
                    ? availableNodesList
                    : availableEdgesList
                }
                onChange={(e) => updateStoreValue(['noteElementId'], OPERATION_TYPE_UPDATE, e.value)}
              />
            </div>
          )
        }

        {
          (
            selectedNotesType === 'graph' || (
              selectedNotesType !== 'graph'
            && noteElementId)
          ) && (
            <NotesListAddNew />
          )
        }

        <Divider />

        {
          (
            selectedNotesType === 'graph' || (
              selectedNotesType !== 'graph'
            && noteElementId)
          ) && (
            <div className="notes-list">
              <div htmlFor="notes-list-title">
                {t('availableNotes')}
              </div>

              <div className="p-input-icon-right notes-list-search-input">
                <i className="pi pi-search" />
                <InputText
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t('search')}
                  id="notes-search-filter"
                />
              </div>

              <div className="notes-select-row">
                <label htmlFor="notes-select">
                  {t('sortBy')}
                </label>
                <div className="p-inputgroup">
                  <Dropdown
                    id="notes-sort-by"
                    value={sortField}
                    options={SORT_FIELDS.map((field) => ({
                      value: field,
                      label: t(field)
                    }))}
                    onChange={(e) => setSortField(e.value)}
                  />
                  <Button
                    id="notes-sort-by-direction"
                    tooltip={t(sortDirection === 'asc' ? 'ascending' : 'descending')}
                    tooltipOptions={{ position: 'top' }}
                    icon={sortDirection === 'asc' ? 'pi pi-arrow-down' : 'pi pi-arrow-up'}
                    onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                  />
                </div>
              </div>

              <div className="notes-accordion-row">
                <Accordion
                  id="notes-filter"
                >
                  <AccordionTab header={t('filter')}>
                    <div className="notes-select-row">
                      <label htmlFor="notes-filter-field">
                        {t('filterBy')}
                      </label>
                      <Dropdown
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
                        <label htmlFor="notes-select">
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

                    {
                    (
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
                    )
                  }

                  </AccordionTab>
                </Accordion>
              </div>

              {
              filteredNotes.length > 0
              && orderBy(filteredNotes, [sortField], [sortDirection]).map((note) => (
                <NotesListNote
                  key={`note-card-${note.id}`}
                  note={note}
                />
              ))
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
  classesFromApi
}) => ({
  notes,
  selectedNotesType,
  nodesNotes,
  edgesNotes,
  noteElementId,
  classesFromApi
})

export default connect(
  mapToProps,
  actions
)(NotesList)
