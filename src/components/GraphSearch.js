import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import Joyride from 'react-joyride'
import GraphSearchCard from './GraphSearchCard'
import { OPERATION_TYPE_UPDATE } from '../constants/store'
import { SIDEBAR_VIEW_ENTRY_SEARCH, SIDEBAR_VIEW_GRAPHS } from '../constants/views'
import { ROUTE_NETWORK_GRAPHS } from '../constants/routes'
import actions from '../store/actions'
import SearchBar from './SearchBar'
import setPageView from '../utils/analytics/setPageView'
import setSearchNeighbourNodes from '../utils/graphSearch/setSearchNeighbourNodes'

const GraphSearch = ({
  entrySearchResultsByPage,
  isFirstQuery,
  isSearchLoading,
  searchPageSelected,
  entrySearchValue,
  updateStoreValue,
  sidebarView,
  showTour
}) => {
  const { t } = useTranslation()

  const searchResults = entrySearchResultsByPage[searchPageSelected]

  const steps = [
    {
      target: '#card-visualise-btn-2',
      content: t('introSearchResults'),
      placement: 'top',
      disableBeacon: true
    }
  ]

  const handleJoyrideCallback = (data) => {
    const { status } = data
    if (!searchResults || searchResults.length < 1) return
    if (status === 'finished') {
      localStorage.setItem('showTour', JSON.stringify({ ...showTour, searchResults: false }))
      const searchResult = searchResults[0]
      setSearchNeighbourNodes({
        separationDegree: 1,
        updateStoreValue,
        searchResult
      })
      updateStoreValue(['selectedNotesType'], OPERATION_TYPE_UPDATE, 'node')
      updateStoreValue(['noteElementId'], OPERATION_TYPE_UPDATE, 0)
      updateStoreValue(['selectedElement'], OPERATION_TYPE_UPDATE, { 0: 'node' })
    }
  }

  return (
    <div className={`graph-search${sidebarView === SIDEBAR_VIEW_ENTRY_SEARCH ? ' elevate-view' : ''}`}>
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
            {showTour.searchResults && (
            <Joyride
              callback={handleJoyrideCallback}
              disableScrolling
              locale={{ close: t('next') }}
              steps={steps}
              styles={{
                options: { primaryColor: '#011e41' }
              }}
            />
            )}

            {
              isFirstQuery ? (
                <>
                  <h1>{t('searchGraph')}</h1>
                  <SearchBar />
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
                        <>
                          <p className="m-b-5">
                            {t('weCouldNotFindAnyMatchFor')}
                            {' '}
                            <span className="bold italic">{entrySearchValue}</span>
                            .
                          </p>
                          <p className="m-t-5">{t('pleaseTryDifferentQuery')}</p>
                          <Button
                            aria-label={t('visualiseEntireOntology')}
                            label={t('visualiseEntireOntology')}
                            id="visualise-ontology-button"
                            className="m-t-30"
                            onClick={() => {
                              updateStoreValue(['currentGraph'], OPERATION_TYPE_UPDATE, 'graph-0')
                              updateStoreValue(['sidebarView'], OPERATION_TYPE_UPDATE, SIDEBAR_VIEW_GRAPHS)
                              window.history.pushState('', '', ROUTE_NETWORK_GRAPHS)
                              setPageView({ url: ROUTE_NETWORK_GRAPHS, updateStoreValue })
                            }}
                          />
                        </>
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
  updateStoreValue: PropTypes.func.isRequired,
  sidebarView: PropTypes.string.isRequired,
  showTour: PropTypes.shape().isRequired,
}

const mapToProps = ({
  isFirstQuery,
  isSearchLoading,
  entrySearchResultsByPage,
  searchPageSelected,
  entrySearchValue,
  sidebarView,
  showTour
}) => ({
  isFirstQuery,
  isSearchLoading,
  entrySearchResultsByPage,
  searchPageSelected,
  entrySearchValue,
  sidebarView,
  showTour
})

export default connect(
  mapToProps,
  actions
)(GraphSearch)
