import {
  useState,
  useEffect
} from 'react'
import { useTranslation } from 'react-i18next'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { SIDEBAR_VIEW_EXPORT } from '../constants/views'
import {
  EXPORT_GRAPH_OPTIONS,
  EXPORT_DATA_OPTIONS,
  EXPORT_PDF,
  EXPORT_CSV
} from '../constants/export'
import exportAsImage from '../utils/exportSettings/exportAsImage'
import exportAsPdf from '../utils/exportSettings/exportAsPdf'
import exportCsv from '../utils/exportSettings/exportCsv'
import exportOwl from '../utils/exportSettings/exportOwl'
import printCanvas from '../utils/exportSettings/printCanvas'

const ExportSettings = () => {
  const { t } = useTranslation()
  const [exportFileName, setFileName] = useState('network-graph')

  const canvasElement = document.getElementById('network-graph') ? document.getElementById('network-graph').getElementsByTagName('canvas')[0] : null

  let printFunction

  useEffect(() => {
    // eslint-disable-next-line
    const print = require('print-js')

    printFunction = (imgSrc) => print(imgSrc, 'image')
  }, [])

  return (
    <>
      <h1 className="sidebar-main-title">
        {t(SIDEBAR_VIEW_EXPORT)}
      </h1>
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

                setFileName(value)
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
                  aria-label={t(option)}
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
                  aria-label={t(option)}
                  key={`export-btn-${option}`}
                  tooltip={t(option)}
                  tooltipOptions={{ position: 'top' }}
                  label={t(option)}
                  onClick={() => (option === EXPORT_CSV ? exportCsv({
                    exportFileName,
                    t
                  }) : exportOwl({
                    exportFileName,
                    t
                  }))}
                />
              ))
            }
          </div>
        </div>

        <div className="export-settings-input">
          <div className="label">
            {t('PrintGraph')}
          </div>
          <div className="export-settings-buttons">
            <Button
              aria-label={t('print')}
              key="export-btn-print"
              tooltip={t('print')}
              tooltipOptions={{ position: 'top' }}
              label={t('print')}
              onClick={() => printCanvas({
                canvasElement,
                printFunction,
                t
              })}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ExportSettings
