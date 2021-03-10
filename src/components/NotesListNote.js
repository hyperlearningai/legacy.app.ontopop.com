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
  addNumber,
  setStoreState,
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
    <div key={`note-${id}`} className="card notes-note">
      {editingId !== id && (
        <div className="notes-content">
          <p>{contents}</p>
        </div>
      )}

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
                {' '}
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

      {
        editingId === id
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

            <div className="notes-buttons">
              <Button
                tooltip={t('close')}
                tooltipOptions={{ position: 'top' }}
                label={t('close')}
                className="p-button-secondary"
                onClick={() => setEditingId('')}
              />
              <Button
                tooltip={t('edit')}
                tooltipOptions={{ position: 'top' }}
                label={t('edit')}
                onClick={() => {
                  setEditingId('')
                  setNoteText('')
                  notesUpdateNote({
                    type: selectedNotesType,
                    selectedElement: selectedNotesType === 'node' ? nodeId : edgeId,
                    selectedNoteID: id,
                    noteText,
                    addNumber,
                    setStoreState,
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
          <div className="notes-buttons">
            <Button
              tooltip={t('delete')}
              tooltipOptions={{ position: 'top' }}
              className="p-button-danger"
              label={t('delete')}
              onClick={() => notesDeleteNote({
                type: selectedNotesType,
                selectedElement: selectedNotesType === 'node' ? nodeId : edgeId,
                selectedNoteID: id,
                addNumber,
                setStoreState,
                t
              })}
            />

            <Button
              tooltip={t('edit')}
              tooltipOptions={{ position: 'top' }}
              label={t('edit')}
              className="p-button-secondary"
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
  setStoreState: PropTypes.func.isRequired,
  addNumber: PropTypes.func.isRequired,
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
