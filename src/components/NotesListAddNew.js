import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { connect } from 'redux-zero/react'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import notesCreateNote from '../utils/notes/notesCreateNote'
import getNode from '../utils/nodesEdgesUtils/getNode'
import getEdge from '../utils/nodesEdgesUtils/getEdge'

const NotesListAddNew = ({
  noteElementId,
  updateStoreValue,
  selectedNotesType,
}) => {
  const { t } = useTranslation()

  const [noteText, setNoteText] = useState('')
  const [showForm, setShowForm] = useState(false)

  let elementLabel

  if (selectedNotesType === 'node') {
    const node = getNode(noteElementId)

    if (node !== null) {
      elementLabel = node.label
    }
  }

  if (selectedNotesType === 'edge') {
    const edge = getEdge(noteElementId)

    if (edge !== null) {
      const {
        from,
        to,
        label
      } = edge

      elementLabel = `${getNode(from).label} => ${label} => ${getNode(to).label}`
    }
  }

  return (
    <div className="card">

      {!showForm
        ? (
          <div className="notes-note notes-add-button">
            <Button
              aria-label={t('addNewNote')}
              tooltip={t('addNewNote')}
              tooltipOptions={{ position: 'top' }}
              label={t('addNewNote')}
              id="add-note"
              onClick={() => setShowForm(true)}
            >
              <i className="pi pi-plus-circle" />
            </Button>
          </div>
        ) : (
          <div className="notes-note">
            <p className="bold">
              {selectedNotesType === 'graph' && t('addGraphNote')}
              {selectedNotesType === 'node' && t('addNodeNote')}
              {selectedNotesType === 'edge' && t('addEdgeNote')}
            </p>
            <label htmlFor="note-textarea">{t('noteText')}</label>
            <InputTextarea
              id="note-textarea"
              value={noteText}
              type="text"
              onChange={(e) => {
                setNoteText(e.target.value)
              }}
            />

            {
              selectedNotesType !== 'graph'
              && (
                <p id="selected-element-label">
                  {`${t(selectedNotesType === 'edge' ? 'forEdge' : 'forNode')}: ${elementLabel}`}
                </p>
              )
            }

            <div className="notes-buttons">
              <Button
                aria-label={t('close')}
                tooltip={t('close')}
                tooltipOptions={{ position: 'top' }}
                className="p-button-secondary"
                label={t('close')}
                id="close-add-note"
                onClick={() => setShowForm(false)}
              />

              <Button
                aria-label={t('addNote')}
                tooltip={t('addNote')}
                tooltipOptions={{ position: 'top' }}
                label={t('addNote')}
                id="submit-note"
                disabled={(selectedNotesType === 'node' && !noteElementId) || (selectedNotesType === 'edge' && !noteElementId)}
                onClick={() => {
                  setShowForm(false)
                  setNoteText('')
                  notesCreateNote({
                    type: selectedNotesType,
                    selectedElement: selectedNotesType === 'node' ? noteElementId : noteElementId,
                    noteText,
                    updateStoreValue,
                    t
                  })
                }}
              />
            </div>
          </div>
        )}

    </div>
  )
}

NotesListAddNew.propTypes = {
  noteElementId: PropTypes.string,
  selectedNotesType: PropTypes.string.isRequired,
  updateStoreValue: PropTypes.func.isRequired,
}

NotesListAddNew.defaultProps = {
  noteElementId: undefined,
}

const mapToProps = ({
  notes,
  noteElementId,
  selectedNotesType,
  nodesNotes,
  edgesNotes,
  user
}) => ({
  notes,
  noteElementId,
  selectedNotesType,
  nodesNotes,
  edgesNotes,
  user
})

export default connect(
  mapToProps,
  actions
)(NotesListAddNew)
