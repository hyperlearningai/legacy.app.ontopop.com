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
          <Button
            label={t('addNewSynonym')}
            aria-label={t('addNewSynonym')}
            id="add-synonym"
            icon="pi pi-plus-circle"
            iconPos="right"
            className="sidebar-button-primary m-t-0"
            onClick={() => setShowForm(true)}
          />
        ) : (
          <div className="synonyms-synonym p-p-2 p-t-20 p-b-20 m-b-30">
            <label
              className="sidebar-main-body-label m-b-10"
              htmlFor="synonym-textarea"
            >
              {t('addNewSynonym')}
            </label>
            <InputTextarea
              id="synonym-textarea"
              value={synonymText}
              type="text"
              onChange={(e) => setSynonymText(e.target.value)}
            />

            <div
              className="sidebar-main-body-info"
              id="selected-element-label"
            >
              {`${t('forNode')}: ${elementLabel}`}
            </div>

            <div className="p-d-flex full-width">
              <Button
                className="sidebar-button-secondary full-width m-r-10 m-t-0 m-b-0"
                label={t('close')}
                aria-label={t('close')}
                id="close-add-synonym"
                onClick={() => setShowForm(false)}
              />

              <Button
                aria-label={t('add')}
                label={t('add')}
                id="submit-synonym"
                className="sidebar-button-primary full-width m-l-10 m-t-0 m-b-0"
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
