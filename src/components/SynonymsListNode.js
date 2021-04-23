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
    <div key={`synonym-${id}`} className="card synonyms-synonym p-p-3 m-t-30">
      {editingId !== id && (
        <>
          <p className="synonyms-content">
            {synonym}
          </p>
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
        </>
      )}

      {
        editingId === id
        && (
          <div>
            <label
              className="sidebar-main-body-label m-b-10"
              htmlFor={`synonym-text-${id}`}
            >
              {t('editSynonym')}
            </label>
            <InputTextarea
              id={`synonym-text-${id}`}
              className="synonym-text"
              value={synonymText || ''}
              type="text"
              onChange={(e) => setSynonymText(e.target.value)}
            />

            <div className="p-d-flex full-width">
              <Button
                aria-label={t('close')}
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
          <div className="p-d-flex full-width">
            <Button
              aria-label={t('delete')}
              className="sidebar-button-secondary delete-synonym m-r-10 m-b-0"
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
              aria-label={t('edit')}
              label={t('edit')}
              className="sidebar-button-primary edit-synonym m-l-10 m-b-0"
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
