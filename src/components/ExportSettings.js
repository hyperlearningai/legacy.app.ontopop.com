import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import actions from '../store/actions'
import { SIDEBAR_VIEW_EXPORT } from '../constants/views'
import {
  EXPORT_GRAPH_OPTIONS,
  EXPORT_DATA_OPTIONS,
  EXPORT_PDF
} from '../constants/export'
import exportAsImage from '../utils/exportAsImage'
import exportAsPdf from '../utils/exportAsPdf'

const ExportSettings = ({
  setStoreState,
  exportFileName
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
            <input
              type="text"
              name="filename"
              value={exportFileName}
              placeholder={t('insertName')}
              onChange={(e) => {
                const { value } = e.target

                setStoreState('exportFileName', value)
              }}
            />
          </div>
        </div>

        <div className="export-settings-input">
          <div className="label">
            {t('exportGraphAs')}
          </div>
          <div className="export-settings-buttons">
            {
              EXPORT_GRAPH_OPTIONS.map((option) => (
                <button
                  key={`export-btn-${option}`}
                  type="button"
                  title={t(option)}
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
                >
                  {t(option)}
                </button>
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
                <button
                  key={`export-btn-${option}`}
                  type="button"
                  title={t(option)}
                  onClick={() => setStoreState('physicsHierarchicalView', true)}
                >
                  {t(option)}
                </button>
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
}

const mapToProps = ({
  exportFileName,
}) => ({
  exportFileName
})

export default connect(
  mapToProps,
  actions
)(ExportSettings)
