import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { connect } from 'redux-zero/react'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import synonymsUpdateSynonym from '../utils/synonyms/synonymsUpdateSynonym'
import synonymsDeleteSynonym from '../utils/synonyms/synonymsDeleteSynonym'

const SynonymsListNode = ({
  synonymObject,
  updateStoreValue,
  classesFromApi,
  user
}) => {
  const { t } = useTranslation()

  const [synonymText, setSynonymText] = useState('')
  const [editingId, setEditingId] = useState('')

  const {
    id,
    userId,
    synonym,
    dateCreated,
    dateLastUpdated,
    nodeId,
  } = synonymObject

  return (
    <div key={`synonym-${id}`} className="card synonyms-synonym">
      {editingId !== id && (
        <div className="synonyms-content">
          <p>{synonym}</p>
        </div>
      )}

      <div className="synonyms-row">
        <span>
          {t('dateCreated')}
        </span>
        <span>{new Date(dateCreated).toLocaleString()}</span>
      </div>
      <div className="synonyms-row">
        <span>
          {t('dateLastUpdated')}
        </span>
        <span>{new Date(dateLastUpdated).toLocaleString()}</span>
      </div>

      <div className="synonyms-row">
        <span>
          {t('userId')}
        </span>
        <span>{userId}</span>
      </div>

      {
        nodeId > 0 && (
          <>
            <div className="synonyms-row">
              <span>
                {' '}
                {t('nodeId')}
              </span>
              <span>{nodeId}</span>
            </div>
            <div className="synonyms-row">
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
        editingId === id
        && (
          <div>
            <label htmlFor={`synonym-text-${id}`}>{t('synonymText')}</label>
            <InputTextarea
              id={`synonym-text-${id}`}
              className="synonym-text"
              value={synonymText || ''}
              type="text"
              onChange={(e) => setSynonymText(e.target.value)}
            />

            <div className="synonyms-buttons">
              <Button
                tooltip={t('close')}
                tooltipOptions={{ position: 'top' }}
                label={t('close')}
                className="p-button-secondary close-synonym"
                id={`close-synonym-${id}`}
                onClick={() => setEditingId('')}
              />
              <Button
                tooltip={t('edit')}
                tooltipOptions={{ position: 'top' }}
                label={t('edit')}
                className="edit-synonym"
                id={`edit-synonym-${id}`}
                onClick={() => {
                  setEditingId('')
                  setSynonymText('')
                  synonymsUpdateSynonym({
                    selectedElement: nodeId,
                    selectedSynonymID: id,
                    synonymText,
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
          <div className="synonyms-buttons">
            <Button
              tooltip={t('delete')}
              tooltipOptions={{ position: 'top' }}
              className="p-button-danger delete-synonym"
              id={`delete-synonym-${id}`}
              label={t('delete')}
              onClick={() => synonymsDeleteSynonym({
                selectedElement: nodeId,
                selectedSynonymID: id,
                updateStoreValue,
                t
              })}
            />

            <Button
              tooltip={t('edit')}
              tooltipOptions={{ position: 'top' }}
              label={t('edit')}
              className="p-button-secondary edit-synonym"
              id={`edit-synonym-${id}`}
              onClick={() => {
                setEditingId(id)
                setSynonymText(synonym)
              }}
            />
          </div>
        )
      }
    </div>
  )
}

SynonymsListNode.propTypes = {
  synonymObject: PropTypes.shape().isRequired,
  updateStoreValue: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
  classesFromApi: PropTypes.shape().isRequired,
}

const mapToProps = ({
  synonym,
  classesFromApi,
  user
}) => ({
  synonym,
  classesFromApi,
  user
})

export default connect(
  mapToProps,
  actions
)(SynonymsListNode)
