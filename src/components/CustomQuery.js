import { useEffect, useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import ReactJson from 'react-json-view'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import { v4 } from 'uuid'
import actions from '../store/actions'
import { SIDEBAR_VIEW_CUSTOM_QUERY } from '../constants/views'
import makeCustomQuery from '../utils/customQuery/makeCustomQuery'
import exportQueryAsJson from '../utils/customQuery/exportQueryAsJson'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-coy.css'
import { CUSTOM_QUERIES_LS } from '../constants/localStorage'

const CustomQuery = ({
  customQueryOutput,
  customQueryStringHistory,
  setStoreState,
  addToArray,
  removeFromArray
}) => {
  const { t } = useTranslation()

  const [customQueryString, setCustomQueryString] = useState('g.')

  useEffect(() => () => {
    const queryHistory = localStorage.getItem(CUSTOM_QUERIES_LS)

    if (queryHistory) {
      setStoreState(
        'customQueryStringHistory',
        JSON.parse(queryHistory)?.data
      )
    }
  }, [])

  useEffect(() => localStorage.setItem(CUSTOM_QUERIES_LS, JSON.stringify({
    data: customQueryStringHistory
  })), [customQueryStringHistory])

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_CUSTOM_QUERY)}
      </div>
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
            tooltip={t('clear')}
            tooltipOptions={{ position: 'top' }}
            className="custom-query-buttons-button"
            icon="pi pi-refresh"
            iconPos="left"
            label={t('clear')}
            onClick={() => {
              setStoreState('customQueryOutput', undefined)
              setCustomQueryString('g.')
            }}
          />

          <Button
            tooltip={t('query')}
            tooltipOptions={{ position: 'top' }}
            className="custom-query-buttons-button"
            disabled={customQueryString.length < 4}
            icon="pi pi-chevron-right"
            iconPos="right"
            label={t('query')}
            onClick={() => makeCustomQuery({
              customQueryString,
              setStoreState,
              addToArray,
              t
            })}
          />
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
                          tooltip={`${t('removeFromHistory')}: ${query}`}
                          onClick={() => removeFromArray('customQueryStringHistory', query)}
                          icon="pi pi-times"
                        />
                      </div>

                      <div className="custom-query-row-main">
                        <Button
                          tooltip={`${t('queryAgain')}: ${query}`}
                          disabled={query === customQueryString}
                          onClick={() => {
                            setStoreState('customQueryOutput', undefined)
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
  setStoreState: PropTypes.func.isRequired,
  removeFromArray: PropTypes.func.isRequired,
  addToArray: PropTypes.func.isRequired,
  customQueryOutput: PropTypes.arrayOf(PropTypes.any),
  customQueryStringHistory: PropTypes.arrayOf(PropTypes.string).isRequired,
}

CustomQuery.defaultProps = {
  customQueryOutput: undefined
}

const mapToProps = ({
  customQueryOutput,
  customQueryStringHistory,
}) => ({
  customQueryOutput,
  customQueryStringHistory,
})

export default connect(
  mapToProps,
  actions
)(CustomQuery)
