import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { connect } from 'redux-zero/react'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import synonymsCreateSynonym from '../utils/synonyms/synonymsCreateSynonym'
import { getElementIdAndType } from '../constants/functions'

const SynonymsListAddNew = ({
  selectedElement,
  updateStoreValue,
  classesFromApi
}) => {
  const { t } = useTranslation()

  const [synonymText, setSynonymText] = useState('')
  const [showForm, setShowForm] = useState(false)

  const [synonymElementId, type] = getElementIdAndType(selectedElement)
  let elementLabel

  if (synonymElementId && type === 'node') {
    elementLabel = classesFromApi[synonymElementId].label
  }

  return type === 'node' ? (
    <div className="card">

      {!showForm
        ? (
          <div className="synonyms-synonym synonyms-add-button">
            <Button
              tooltip={t('addNewSynonym')}
              tooltipOptions={{ position: 'top' }}
              label={t('addNewSynonym')}
              id="add-synonym"
              onClick={() => setShowForm(true)}
            >
              <i className="pi pi-plus-circle" />
            </Button>
          </div>
        ) : (
          <div className="synonyms-synonym">
            <p className="bold">
              {t('addNewSynonym')}
            </p>
            <label htmlFor="synonym-textarea">{t('synonymText')}</label>
            <InputTextarea
              id="synonym-textarea"
              value={synonymText}
              type="text"
              onChange={(e) => setSynonymText(e.target.value)}
            />

            <p id="selected-element-label">
              {`${t('forNode')}: ${elementLabel}`}
            </p>

            <div className="synonyms-buttons">
              <Button
                tooltip={t('close')}
                tooltipOptions={{ position: 'top' }}
                className="p-button-secondary"
                label={t('close')}
                id="close-add-synonym"
                onClick={() => setShowForm(false)}
              />

              <Button
                tooltip={t('addSynonym')}
                tooltipOptions={{ position: 'top' }}
                label={t('addSynonym')}
                id="submit-synonym"
                disabled={!synonymElementId}
                onClick={() => {
                  setShowForm(false)
                  setSynonymText('')
                  synonymsCreateSynonym({
                    selectedElement: synonymElementId,
                    synonymText,
                    updateStoreValue,
                    t
                  })
                }}
              />
            </div>
          </div>
        )}

    </div>
  ) : null
}

SynonymsListAddNew.propTypes = {
  selectedElement: PropTypes.shape(),
  updateStoreValue: PropTypes.func.isRequired,
  classesFromApi: PropTypes.shape().isRequired,
}

SynonymsListAddNew.defaultProps = {
  selectedElement: undefined,
}

const mapToProps = ({
  selectedElement,
  classesFromApi
}) => ({
  selectedElement,
  classesFromApi
})

export default connect(
  mapToProps,
  actions
)(SynonymsListAddNew)
