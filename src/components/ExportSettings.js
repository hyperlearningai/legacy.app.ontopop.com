import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import { SIDEBAR_VIEW_EXPORT } from '../constants/views'
import {
  EXPORT_GRAPH_OPTIONS,
  EXPORT_DATA_OPTIONS,
  EXPORT_PDF,
  EXPORT_CSV
} from '../constants/export'
import exportAsImage from '../utils/exportAsImage'
import exportAsPdf from '../utils/exportAsPdf'
import exportCsv from '../utils/exportCsv'
import exportOwl from '../utils/exportOwl'

const ExportSettings = ({
  setStoreState,
  exportFileName,
  availableNodesNormalised,
  availableEdgesNormalised,
  objectPropertiesFromApi,
  classesFromApi
}) => {
  const { t } = useTranslation()
  const canvasElement = document.getElementById('network-graph').getElementsByTagName('canvas')[0]

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_EXPORT)}
      </div>
      <div className="export-settings">
        <div className="export-settings-input">
          <label htmlFor="filename">
            {t('fileName')}
          </label>
          <div className="export-settings-item-input">
            <InputText
              id="filename"
              value={exportFileName}
              placeholder={t('insertName')}
              onChange={(e) => {
                const { value } = e.target

                setStoreState('exportFileName', value)
              }}
            />
            {
              exportFileName === '' && (
                <small id="username2-help" className="p-invalid p-d-block">
                  {t('insertFileName')}
                </small>
              )
            }
          </div>
        </div>

        <div className="export-settings-input">
          <div className="label">
            {t('exportGraphAs')}
          </div>
          <div className="export-settings-buttons">
            {
              EXPORT_GRAPH_OPTIONS.map((option) => (
                <Button
                  key={`export-btn-${option}`}
                  tooltip={t(option)}
                  label={t(option)}
                  tooltipOptions={{ position: 'top' }}
                  onClick={() => (option === EXPORT_PDF
                    ? exportAsPdf({
                      exportFileName,
                      canvasElement,
                      t
                    })
                    : exportAsImage({
                      exportFileName,
                      type: option,
                      canvasElement,
                      t
                    }))}
                />
              ))
            }
          </div>
        </div>

        <div className="export-settings-input">
          <div className="label">
            {t('exportDataAs')}
          </div>
          <div className="export-settings-buttons">
            {
              EXPORT_DATA_OPTIONS.map((option) => (
                <Button
                  key={`export-btn-${option}`}
                  tooltip={t(option)}
                  tooltipOptions={{ position: 'top' }}
                  label={t(option)}
                  onClick={() => (option === EXPORT_CSV ? exportCsv({
                    exportFileName,
                    availableNodesNormalised,
                    availableEdgesNormalised,
                    objectPropertiesFromApi,
                    t
                  }) : exportOwl({
                    exportFileName,
                    availableNodesNormalised,
                    availableEdgesNormalised,
                    objectPropertiesFromApi,
                    classesFromApi,
                    t
                  }))}
                />
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

ExportSettings.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  exportFileName: PropTypes.string.isRequired,
  availableNodesNormalised: PropTypes.shape().isRequired,
  availableEdgesNormalised: PropTypes.shape().isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
  classesFromApi: PropTypes.shape().isRequired,
}

const mapToProps = ({
  exportFileName,
  availableNodesNormalised,
  availableEdgesNormalised,
  objectPropertiesFromApi,
  classesFromApi
}) => ({
  exportFileName,
  availableNodesNormalised,
  availableEdgesNormalised,
  objectPropertiesFromApi,
  classesFromApi
})

export default connect(
  mapToProps,
  actions
)(ExportSettings)
