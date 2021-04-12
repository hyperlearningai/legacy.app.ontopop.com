import { useEffect, useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import { v4 } from 'uuid'
import { ProgressSpinner } from 'primereact/progressspinner'
import dynamic from 'next/dynamic'
import actions from '../store/actions'
import { SIDEBAR_VIEW_CUSTOM_QUERY } from '../constants/views'
import makeCustomQuery from '../utils/customQuery/makeCustomQuery'
import exportQueryAsJson from '../utils/customQuery/exportQueryAsJson'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-coy.css'
import { CUSTOM_QUERIES_LS } from '../constants/localStorage'
import { OPERATION_TYPE_TOGGLE, OPERATION_TYPE_UPDATE } from '../constants/store'

const ReactJson = dynamic(import('react-json-view'), { ssr: false })

const CustomQuery = ({
  updateStoreValue,
  customQueryOutput,
  customQueryStringHistory,
}) => {
  const { t } = useTranslation()

  const [customQueryString, setCustomQueryString] = useState('g.')
  const [isLoading, setLoader] = useState(false)

  useEffect(() => () => {
    const queryHistory = localStorage.getItem(CUSTOM_QUERIES_LS)

    if (queryHistory) {
      updateStoreValue(
        ['customQueryStringHistory'], OPERATION_TYPE_UPDATE,
        JSON.parse(queryHistory)?.data
      )
    }
  }, [])

  useEffect(() => localStorage.setItem(CUSTOM_QUERIES_LS, JSON.stringify({
    data: customQueryStringHistory
  })), [customQueryStringHistory])

  return (
    <>
      <h1 className="sidebar-main-title">
        {t(SIDEBAR_VIEW_CUSTOM_QUERY)}
      </h1>
      <div className="custom-query">

        <div className="p-input-icon-right custom-query-input">
          <Editor
            value={customQueryString}
            onValueChange={(code) => setCustomQueryString(code)}
            highlight={(code) => highlight(code, languages.javascript)}
            padding={10}
            className="custom-query-editor"
          />
        </div>

        <div className="custom-query-buttons">
          <Button
            aria-label={t('clear')}
            tooltip={t('clear')}
            tooltipOptions={{ position: 'top' }}
            className="custom-query-buttons-button"
            icon="pi pi-refresh"
            iconPos="left"
            label={t('clear')}
            onClick={() => {
              updateStoreValue(['customQueryOutput'], OPERATION_TYPE_UPDATE, undefined)
              setCustomQueryString('g.')
            }}
          />

          {
            isLoading ? (
              <div className="custom-query-loader">
                <ProgressSpinner
                  className="spinner"
                  strokeWidth="4"
                />
              </div>
            ) : (
              <Button
                aria-label={t('query')}
                tooltip={t('query')}
                tooltipOptions={{ position: 'top' }}
                className="custom-query-buttons-button"
                disabled={customQueryString.length < 4}
                icon="pi pi-chevron-right"
                iconPos="right"
                label={t('query')}
                onClick={() => makeCustomQuery({
                  updateStoreValue,
                  customQueryString,
                  setLoader,
                  t
                })}
              />
            )
          }

        </div>

        <div className="custom-query-info">
          {
            customQueryOutput ? (
              <>
                <ReactJson
                  src={customQueryOutput}
                  sortKeys
                  theme="monokai"
                  collapseStringsAfterLength={30}
                  collapsed
                />
                <div className="custom-query-buttons">
                  <Button
                    tooltip={t('exportAsJson')}
                    tooltipOptions={{ position: 'top' }}
                    className="custom-query-buttons-button"
                    icon="pi pi-download"
                    iconPos="right"
                    label={t('exportAsJson')}
                    onClick={() => exportQueryAsJson({
                      exportFileName: 'gremlin-query',
                      t,
                    })}
                  />
                </div>
              </>
            ) : (
              <div className="custom-query-input">
                <div className="label">
                  {t('queryHistory')}
                </div>

                {
                  customQueryStringHistory.map((query) => (
                    <div
                      className="custom-query-row"
                      key={`custom-query-row-${v4()}`}
                    >
                      <div className="custom-query-row-delete">
                        <Button
                          aria-label={t('removeFromHistory')}
                          tooltip={`${t('removeFromHistory')}: ${query}`}
                          onClick={() => updateStoreValue(['customQueryStringHistory'], OPERATION_TYPE_TOGGLE, query)}
                          icon="pi pi-times"
                        />
                      </div>

                      <div className="custom-query-row-main">
                        <Button
                          aria-label={t('queryAgain')}
                          tooltip={`${t('queryAgain')}: ${query}`}
                          disabled={query === customQueryString}
                          onClick={() => {
                            updateStoreValue(['customQueryOutput'], OPERATION_TYPE_UPDATE, undefined)
                            setCustomQueryString(query)
                          }}
                        >
                          <span>
                            {query}
                          </span>
                          <i className="pi pi-chevron-right" />
                        </Button>
                      </div>
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

CustomQuery.propTypes = {
  updateStoreValue: PropTypes.func.isRequired,
  customQueryOutput: PropTypes.arrayOf(PropTypes.any),
  customQueryStringHistory: PropTypes.arrayOf(PropTypes.string).isRequired,
}

CustomQuery.defaultProps = {
  customQueryOutput: undefined
}

const mapToProps = ({
  customQueryOutput,
  customQueryStringHistory,
  activeLoaders
}) => ({
  customQueryOutput,
  customQueryStringHistory,
  activeLoaders
})

export default connect(
  mapToProps,
  actions
)(CustomQuery)
