import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { connect } from 'redux-zero/react'
import { SelectButton } from 'primereact/selectbutton'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { SIDEBAR_VIEW_NOTES } from '../constants/views'
import actions from '../store/actions'
import resetSelectedNode from '../utils/nodesSelection/resetSelectedNode'
import highlightSelectedNode from '../utils/nodesSelection/highlightSelectedNode'
import notesGetNotes from '../utils/notes/notesGetNotes'
import notesCreateNote from '../utils/notes/notesCreateNote'
import notesUpdateNote from '../utils/notes/notesUpdateNote'
import notesDeleteNote from '../utils/notes/notesDeleteNote'

const NotesList = ({
  notes,
  addNumber,
  selectedNode,
  selectedEdge,
  setStoreState,
  addToObject
}) => {
  const { t } = useTranslation()

  const [type, setType] = useState('graph')
  const [noteText, setNoteText] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingKey, setEditingKey] = useState('')

  useEffect(() => () => {
    setStoreState('selectedNode', undefined)

    resetSelectedNode({
      setStoreState
    })
  }, [])

  useEffect(() => {
    notesGetNotes({
      addNumber,
      setStoreState,
      t
    })

    if (selectedNode && selectedNode !== '') {
      resetSelectedNode({
        setStoreState
      })

      highlightSelectedNode({
        setStoreState,
        selectedNode
      })
    }
  }, [selectedNode])

  let filteredNotes = notes
  if (notes.length && type === 'node' && selectedNode) {
    filteredNotes = notes.filter((note) => note.nodeId === selectedNode)
  } else if (notes.length && type === 'edge' && selectedEdge) {
    filteredNotes = notes.filter((note) => note.edgeId === parseInt(selectedEdge))
  }

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

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_NOTES)}
      </div>

      <div className="notes">
        <div className="notes-highlight">
          <Button
            tooltip={t('highlightNotes')}
            tooltipOptions={{ position: 'top' }}
            label={t('highlightNotes')}
            onClick={() => addToObject('globalNodeStyling', 'stylingNodeBorderColor', 'red')}
          />
        </div>

        <div className="notes-select-row">
          <label htmlFor="notes-select">
            {t('resultsType')}
          </label>
          <SelectButton
            id="notes-select"
            value={type}
            options={noteButtons}
            onChange={(e) => {
              setType(e.value)
              setStoreState(e.value === 'node' ? 'isNodeSelectable' : 'isEdgeSelectable', true)
              notesGetNotes({
                type: e.value,
                selectedElement: selectedNode,
                addNumber,
                setStoreState,
                t
              })
            }}
            itemTemplate={itemTemplate}
          />
        </div>
        <div className="notes-list">
          <div className="card">

            {!showForm
              && (
              <div className="notes-note notes-add-button">
                <Button
                  tooltip={t('addNewNote')}
                  tooltipOptions={{ position: 'top' }}
                  label={t('addNewNote')}
                  onClick={() => setShowForm(true)}
                />
              </div>
              )}
            {showForm
              && (
              <div className="notes-note">
                <h2>
                  {type === 'graph' && t('addGraphNote')}
                  {type === 'node' && t('addNodeNote')}
                  {type === 'edge' && t('addEdgeNote')}
                </h2>
                <label htmlFor="noteText">{t('noteText')}</label>
                <InputTextarea
                  id="noteText"
                  value={noteText}
                  type="text"
                  onChange={(e) => {
                    setNoteText(e.target.value)
                  }}
                />
                {type === 'node' && <p>{selectedNode ? `${t('forNode')}: ${selectedNode}` : t('selectNodeFromGraph')}</p>}
                {type === 'edge' && <p>{selectedEdge ? `${t('forEdge')}: ${selectedEdge}` : t('selectEdgeFromGraph')}</p>}
                <Button
                  tooltip={t('addNote')}
                  tooltipOptions={{ position: 'top' }}
                  label={t('addNote')}
                  disabled={(type === 'node' && !selectedNode) || (type === 'edge' && !selectedEdge)}
                  onClick={() => {
                    setShowForm(false)
                    setNoteText('')
                    notesCreateNote({
                      type,
                      selectedElement: type === 'node' ? selectedNode : selectedEdge,
                      noteText,
                      addNumber,
                      setStoreState,
                      t
                    })
                  }}
                />

                <Button
                  tooltip={t('close')}
                  tooltipOptions={{ position: 'top' }}
                  className="p-button-secondary"
                  label={t('close')}
                  onClick={() => setShowForm(false)}
                />

              </div>
              )}

            {filteredNotes.length > 0 && filteredNotes.map((note) => (
              <div key={note.id} className="notes-note">
                {!(editingKey === note.id) && (
                <div className="notes-content">
                  <p>{note.contents}</p>
                </div>
                )}

                <div className="notes-row">
                  <span>
                    {' '}
                    {t('dateCreated')}
                  </span>
                  <span>{new Date(note.dateCreated).toLocaleString()}</span>
                </div>
                <div className="notes-row">
                  <span>
                    {' '}
                    {t('dateLastUpdated')}
                  </span>
                  <span>{new Date(note.dateLastUpdated).toLocaleString()}</span>
                </div>

                <div className="notes-row">
                  <span>
                    {' '}
                    {t('userId')}
                  </span>
                  <span>{note.userId}</span>
                </div>

                {'nodeId' in note && note.nodeId > 0 && (
                <div className="notes-row">
                  <span>
                    {' '}
                    {t('nodeId')}
                  </span>
                  <span>{note.nodeId}</span>
                </div>
                )}

                {'edgeId' in note && note.edgeId > 0 && (
                <div className="notes-row">
                  <span>
                    {' '}
                    {t('edgeId')}
                  </span>
                  <span>{note.edgeId}</span>
                </div>
                )}

                {editingKey === note.id
                  && (
                  <div>
                    <label htmlFor="noteText">{t('noteText')}</label>
                    <InputTextarea
                      id="noteText"
                      value={noteText}
                      type="text"
                      onChange={(e) => {
                        setNoteText(e.target.value)
                      }}
                    />

                    <Button
                      tooltip={t('edit')}
                      tooltipOptions={{ position: 'top' }}
                      label={t('edit')}
                      onClick={() => {
                        setEditingKey('')
                        setNoteText('')
                        notesUpdateNote({
                          type,
                          selectedElement: type === 'node' ? note.nodeId : note.edgeId,
                          selectedNoteID: note.id,
                          noteText,
                          addNumber,
                          setStoreState,
                          t
                        })
                      }}
                    />
                    <Button
                      tooltip={t('close')}
                      tooltipOptions={{ position: 'top' }}
                      label={t('close')}
                      className="p-button-secondary"
                      onClick={() => setEditingKey('')}
                    />
                  </div>
                  )}

                {!(editingKey === note.id) && (
                <div>
                  <Button
                    tooltip={t('edit')}
                    tooltipOptions={{ position: 'top' }}
                    label={t('edit')}
                    className="p-button-secondary"
                    onClick={() => {
                      setEditingKey(note.id)
                      setNoteText(note.contents)
                    }}
                  />

                  <Button
                    tooltip={t('delete')}
                    tooltipOptions={{ position: 'top' }}
                    className="p-button-danger"
                    label={t('delete')}
                    onClick={() => notesDeleteNote({
                      type,
                      selectedElement: type === 'node' ? note.nodeId : note.edgeId,
                      selectedNoteID: note.id,
                      addNumber,
                      setStoreState,
                      t
                    })}
                  />
                </div>
                )}

              </div>
            ))}

          </div>

        </div>
      </div>
    </>
  )
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  selectedNode: PropTypes.string,
  selectedEdge: PropTypes.string,
  setStoreState: PropTypes.func.isRequired,
  addNumber: PropTypes.func.isRequired,
  addToObject: PropTypes.func.isRequired,
}

NotesList.defaultProps = {
  selectedNode: undefined,
  selectedEdge: undefined
}

const mapToProps = ({
  notes,
  selectedNode,
  selectedEdge
}) => ({
  notes,
  selectedNode,
  selectedEdge
})

export default connect(
  mapToProps,
  actions
)(NotesList)
