import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { ProgressSpinner } from 'primereact/progressspinner'
import GraphSearchCard from './GraphSearchCard'

const GraphSearch = ({
  entrySearchResultsByPage,
  isFirstQuery,
  isSearchLoading,
  searchPageSelected,
  entrySearchValue
}) => {
  const { t } = useTranslation()

  const searchResults = entrySearchResultsByPage[searchPageSelected]

  return (
    <div className="graph-search">
      {
        isSearchLoading ? (
          <div className="graph-search-loader">
            <ProgressSpinner
              className="spinner"
              strokeWidth="4"
            />
          </div>
        ) : (
          <>
            {
              !isFirstQuery ? (
                <>
                  <h1>{t('searchGraph')}</h1>
                  <p>{t('typeInSidebar')}</p>
                  <p>{t('setAdvancedOptions')}</p>
                </>
              ) : (
                <>
                  {
                    searchResults
                    && searchResults.length > 0
                      ? (
                        <div className="graph-search-results">
                          <div className="graph-search-results-list">
                            {
                            searchResults.map((searchResult, index) => (
                              <GraphSearchCard
                                index={index}
                                key={`graph-card-${searchResult.type}-${searchResult.label}`}
                                searchResult={searchResult}
                              />
                            ))
                          }
                          </div>
                        </div>
                      ) : (
                        <p>
                          {t('weCouldNotFindAnyMatchFor')}
                          {' '}
                          <span className="bold italic">{entrySearchValue}</span>
                          .
                        </p>
                      )
                  }
                </>
              )
            }
          </>
        )
      }
    </div>
  )
}

GraphSearch.propTypes = {
  entrySearchResultsByPage: PropTypes.shape().isRequired,
  isFirstQuery: PropTypes.bool.isRequired,
  isSearchLoading: PropTypes.bool.isRequired,
  searchPageSelected: PropTypes.number.isRequired,
  entrySearchValue: PropTypes.string.isRequired,
}

const mapToProps = ({
  isFirstQuery,
  isSearchLoading,
  entrySearchResultsByPage,
  searchPageSelected,
  entrySearchValue
}) => ({
  isFirstQuery,
  isSearchLoading,
  entrySearchResultsByPage,
  searchPageSelected,
  entrySearchValue
})

export default connect(
  mapToProps
)(GraphSearch)
