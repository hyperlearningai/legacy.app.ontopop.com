import { useState, useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { AutoComplete } from 'primereact/autocomplete'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import getSuggestions from '../utils/graphSearch/getSuggestions'
import searchGraph from '../utils/graphSearch/searchGraph'
import GraphSearchCard from './GraphSearchCard'
import { OPERATION_TYPE_UPDATE } from '../constants/store'

const GraphSearch = ({
  updateStoreValue,
  entrySearchResults,
  isQueried,
  entrySearchValue
}) => {
  const { t } = useTranslation()

  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => () => {
    updateStoreValue(['isQueried'], OPERATION_TYPE_UPDATE, false)
    updateStoreValue(['entrySearchResults'], OPERATION_TYPE_UPDATE, [])
    updateStoreValue(['entrySearchValue'], OPERATION_TYPE_UPDATE, '')
  }, [])

  return (
    <div className="graph-search">
      <h2>{t('searchGraph')}</h2>
      <p>{t('sidebarForAdvancedOptions')}</p>

      {
        loading
          ? (
            <div className="graph-search-loader">
              <ProgressSpinner
                className="spinner"
                strokeWidth="4"
              />
            </div>
          ) : (
            <div className="graph-search-bar">
              <form onSubmit={(e) => {
                e.preventDefault()

                searchGraph({
                  updateStoreValue,
                  setLoading
                })
              }}
              >
                <AutoComplete
                  name="search"
                  value={entrySearchValue}
                  id="main-search"
                  suggestions={suggestions}
                  completeMethod={(e) => {
                    const { query } = e

                    getSuggestions({
                      query,
                      suggestions,
                      setSuggestions
                    })
                  }}
                  field="label"
                  onSelect={(e) => {
                    const { value } = e.value

                    updateStoreValue(['entrySearchValue'], OPERATION_TYPE_UPDATE, value)

                    searchGraph({
                      updateStoreValue,
                      setLoading
                    })
                  }}
                  onChange={(e) => {
                    updateStoreValue(['isQueried'], OPERATION_TYPE_UPDATE, false)
                    updateStoreValue(['entrySearchValue'], OPERATION_TYPE_UPDATE, e.value)
                  }}
                />
                <Button
                  icon="pi pi-search"
                  id="search-icon"
                  className="p-button-rounded"
                  onClick={() => searchGraph({
                    updateStoreValue,
                    setLoading
                  })}
                />
                <input
                  name="submit"
                  className="hidden"
                  type="submit"
                />
              </form>
            </div>
          )
        }

      {
        isQueried && (
          <>
            <Divider />
            <div className="graph-search-results">
              <div className="graph-search-results-number">
                {`${t('searchResultsFor')} ${entrySearchValue}: ${entrySearchResults.length}`}
              </div>
              <div className="graph-search-results-list">
                {
                  entrySearchResults.length > 0
                  && entrySearchResults.map((searchResult) => (
                    <GraphSearchCard
                      key={`graph-card-${searchResult.type}-${searchResult.label}`}
                      searchResult={searchResult}
                    />
                  ))
                }
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

GraphSearch.propTypes = {
  updateStoreValue: PropTypes.func.isRequired,
  entrySearchResults: PropTypes.arrayOf(PropTypes.shape).isRequired,
  isQueried: PropTypes.bool.isRequired,
  entrySearchValue: PropTypes.string.isRequired,
}

const mapToProps = ({
  entrySearchResults,
  isQueried,
  entrySearchValue
}) => ({
  entrySearchResults,
  isQueried,
  entrySearchValue
})

export default connect(
  mapToProps,
  actions
)(GraphSearch)
