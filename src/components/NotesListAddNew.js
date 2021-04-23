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
    <>
      {!showForm
        ? (
          <Button
            aria-label={t('addNewNote')}
            label={t('addNewNote')}
            id="add-note"
            icon="pi pi-plus-circle"
            iconPos="right"
            className="sidebar-button-primary m-t-0"
            onClick={() => setShowForm(true)}
          />
        ) : (
          <div className="card notes-note p-p-2 p-t-20 p-b-20 m-b-30">
            <label
              className="sidebar-main-body-label m-b-10"
              htmlFor="note-textarea"
            >
              {selectedNotesType === 'graph' && t('addGraphNote')}
              {selectedNotesType === 'node' && t('addNodeNote')}
              {selectedNotesType === 'edge' && t('addEdgeNote')}
            </label>
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
                <div
                  className="sidebar-main-body-info"
                  id="selected-element-label"
                >
                  {`${t(selectedNotesType === 'edge' ? 'forEdge' : 'forNode')}: ${elementLabel}`}
                </div>
              )
            }

            <div className="p-d-flex full-width">
              <Button
                aria-label={t('close')}
                className="sidebar-button-secondary full-width m-r-10 m-t-0 m-b-0"
                label={t('close')}
                id="close-add-note"
                onClick={() => setShowForm(false)}
              />

              <Button
                aria-label={t('add')}
                label={t('add')}
                id="submit-note"
                className="sidebar-button-primary full-width m-l-10 m-t-0 m-b-0"
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
    </>
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
