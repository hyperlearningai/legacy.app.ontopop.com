import { useState, useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { AutoComplete } from 'primereact/autocomplete'
import { BsSearch } from 'react-icons/bs'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Divider } from 'primereact/divider'
import actions from '../store/actions'
import getSuggestions from '../utils/graphSearch/getSuggestions'
import searchGraph from '../utils/graphSearch/searchGraph'
import GraphSearchCard from './GraphSearchCard'

const GraphSearch = ({
  setStoreState,
  entrySearchResults,
  isQueried,
}) => {
  const { t } = useTranslation()

  useEffect(() => () => {
    setStoreState('isQueried', false)
    setStoreState('entrySearchResults', [])
  }, [])

  const [search, setSearch] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)

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
              <AutoComplete
                value={search}
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

                  searchGraph({
                    value,
                    setStoreState,
                    setSearch,
                    setLoading
                  })
                }}
                onChange={(e) => {
                  setStoreState('isQueried', false)
                  setSearch(e.value)
                }}
              />
              <BsSearch />
            </div>
          )
        }

      {
        isQueried && (
          <>
            <Divider />
            <div className="graph-search-results">
              <div className="graph-search-results-number">
                {`${t('searchResults')}: ${entrySearchResults.length}`}
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
  setStoreState: PropTypes.func.isRequired,
  entrySearchResults: PropTypes.arrayOf(PropTypes.shape).isRequired,
  isQueried: PropTypes.bool.isRequired,
}

const mapToProps = ({
  entrySearchResults,
  isQueried,
}) => ({
  entrySearchResults,
  isQueried,
})

export default connect(
  mapToProps,
  actions
)(GraphSearch)
