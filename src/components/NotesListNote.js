import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { connect } from 'redux-zero/react'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import notesUpdateNote from '../utils/notes/notesUpdateNote'
import notesDeleteNote from '../utils/notes/notesDeleteNote'

const NotesListNode = ({
  note,
  updateStoreValue,
  selectedNotesType,
  classesFromApi,
  objectPropertiesFromApi,
  user
}) => {
  const { t } = useTranslation()

  const [noteText, setNoteText] = useState('')
  const [editingId, setEditingId] = useState('')

  const {
    id,
    userId,
    contents,
    dateCreated,
    dateLastUpdated,
    nodeId,
    edgeId
  } = note

  return (
    <div key={`note-${id}`} className="card notes-note p-p-3 m-t-30">
      {editingId !== id && (
        <>
          <p className="notes-content">
            {contents}
          </p>

          <div className="notes-row">
            <span>
              {t('dateCreated')}
            </span>
            <span>{new Date(dateCreated).toLocaleString()}</span>
          </div>
          <div className="notes-row">
            <span>
              {t('dateLastUpdated')}
            </span>
            <span>{new Date(dateLastUpdated).toLocaleString()}</span>
          </div>

          <div className="notes-row">
            <span>
              {t('userId')}
            </span>
            <span>{userId}</span>
          </div>

          {
            nodeId > 0 && (
              <>
                <div className="notes-row">
                  <span>
                    {t('nodeId')}
                  </span>
                  <span>{nodeId}</span>
                </div>
                <div className="notes-row">
                  <span>
                    {t('nodeLabel')}
                  </span>
                  <span>
                    {
                      classesFromApi[nodeId].label
                    }
                  </span>
                </div>
              </>
            )
          }

          {
            edgeId > 0 && (
              <>
                <div className="notes-row">
                  <span>
                    {t('edgeId')}
                  </span>
                  <span>{edgeId}</span>
                </div>
                <div className="notes-row">
                  <span>
                    {t('edgeLabel')}
                  </span>
                  <span>
                    {
                      `${classesFromApi[objectPropertiesFromApi[edgeId].from].label} => ${objectPropertiesFromApi[edgeId].label} => ${classesFromApi[objectPropertiesFromApi[edgeId].to].label}`
                    }
                  </span>
                </div>
              </>
            )
          }
        </>
      )}

      {
        editingId === id
        && (
          <div>
            <label
              className="sidebar-main-body-label m-b-10"
              htmlFor={`note-text-${id}`}
            >
              {t('editNote')}
            </label>
            <InputTextarea
              id={`note-text-${id}`}
              className="note-text"
              value={noteText}
              type="text"
              onChange={(e) => {
                setNoteText(e.target.value)
              }}
            />

            <div className="p-d-flex full-width">
              <Button
                aria-label={t('close')}
                label={t('close')}
                className="sidebar-button-secondary close-note m-r-10 m-t-0 m-b-0"
                id={`close-note-${id}`}
                onClick={() => setEditingId('')}
              />
              <Button
                aria-label={t('edit')}
                label={t('edit')}
                className="sidebar-button-primary edit-note m-l-10 m-t-0 m-b-0"
                id={`edit-note-${id}`}
                onClick={() => {
                  setEditingId('')
                  setNoteText('')
                  notesUpdateNote({
                    type: selectedNotesType,
                    selectedElement: selectedNotesType === 'node' ? nodeId : edgeId,
                    selectedNoteID: id,
                    noteText,
                    updateStoreValue,
                    t
                  })
                }}
              />

            </div>
          </div>
        )
      }

      {
        editingId !== id
        && user.email === userId
        && (
          <div className="p-d-flex full-width">
            <Button
              aria-label={t('delete')}
              className="sidebar-button-secondary delete-note m-r-10 m-b-0"
              id={`delete-note-${id}`}
              label={t('delete')}
              onClick={() => notesDeleteNote({
                type: selectedNotesType,
                selectedElement: selectedNotesType === 'node' ? nodeId : edgeId,
                selectedNoteID: id,
                updateStoreValue,
                t
              })}
            />

            <Button
              aria-label={t('edit')}
              label={t('edit')}
              className="sidebar-button-primary edit-note m-l-10 m-b-0"
              id={`edit-note-${id}`}
              onClick={() => {
                setEditingId(id)
                setNoteText(contents)
              }}
            />
          </div>
        )
      }
    </div>
  )
}

NotesListNode.propTypes = {
  note: PropTypes.shape().isRequired,
  selectedNotesType: PropTypes.string.isRequired,
  updateStoreValue: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
  classesFromApi: PropTypes.shape().isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
}

const mapToProps = ({
  note,
  selectedNotesType,
  classesFromApi,
  objectPropertiesFromApi,
  user
}) => ({
  note,
  selectedNotesType,
  classesFromApi,
  objectPropertiesFromApi,
  user
})

export default connect(
  mapToProps,
  actions
)(NotesListNode)
