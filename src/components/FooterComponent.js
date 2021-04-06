/* eslint react/display-name:0 */
import React, { useEffect } from 'react'
import { Paginator } from 'primereact/paginator'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { version } from '../../package.json'
import actions from '../store/actions'
import { SIDEBAR_VIEW_ENTRY_SEARCH } from '../constants/views'
import { OPERATION_TYPE_UPDATE } from '../constants/store'
import { DISPLAYED_PAGE_NUMBERS_ON_PAGINATOR, DISPLAYED_RESULTS_PER_PAGE } from '../constants/search'
import searchGraph from '../utils/graphSearch/searchGraph'

const FooterComponent = ({
  updateStoreValue,
  totalSearchCount,
  sidebarView,
  searchPageSelected,
  entrySearchResultsByPage
}) => {
  const { t } = useTranslation()

  useEffect(() => {
    if (searchPageSelected > 0 && !entrySearchResultsByPage[searchPageSelected]) {
      searchGraph({
        updateStoreValue,
        t
      })
    }
  }, [entrySearchResultsByPage, searchPageSelected])

  const prevSymbol = '<'
  const nextSymbol = '>'

  const paginationTemplate = {
    layout: 'PrevPageLink PageLinks NextPageLink',
    PrevPageLink: (options) => (
      <button
        type="button"
        className={options.className}
        onClick={options.onClick}
        disabled={options.disabled}
      >
        <span className="p-p-3">{prevSymbol}</span>
      </button>
    ),
    NextPageLink: (options) => (
      <button
        type="button"
        className={options.className}
        onClick={options.onClick}
        disabled={options.disabled}
      >
        <span className="p-p-3">{nextSymbol}</span>
      </button>
    ),
    PageLinks: (options) => (
      <button
        type="button"
        className={options.className}
        onClick={options.onClick}
      >
        {options.page + 1}
      </button>
    )
  }

  return (
    <footer>
      {
        sidebarView === SIDEBAR_VIEW_ENTRY_SEARCH ? (
          <div className="footer-center">
            {
              totalSearchCount > 0 && (
                <Paginator
                  template={paginationTemplate}
                  first={(searchPageSelected) * DISPLAYED_RESULTS_PER_PAGE}
                  rows={DISPLAYED_RESULTS_PER_PAGE}
                  pageLinkSize={DISPLAYED_PAGE_NUMBERS_ON_PAGINATOR}
                  totalRecords={totalSearchCount}
                  onPageChange={(e) => updateStoreValue(['searchPageSelected'], OPERATION_TYPE_UPDATE, e.page)}
                />
              )
            }

          </div>
        ) : (
          <div className="footer-center">
            {`Ontology Visualisation v${version}`}
          </div>
        )
      }
    </footer>
  )
}

FooterComponent.propTypes = {
  sidebarView: PropTypes.string.isRequired,
  searchPageSelected: PropTypes.number.isRequired,
  totalSearchCount: PropTypes.number.isRequired,
  updateStoreValue: PropTypes.func.isRequired,
  entrySearchResultsByPage: PropTypes.shape().isRequired,
}

const mapToProps = ({
  sidebarView,
  totalSearchCount,
  searchPageSelected,
  entrySearchResultsByPage
}) => ({
  sidebarView,
  totalSearchCount,
  searchPageSelected,
  entrySearchResultsByPage
})

export default connect(
  mapToProps,
  actions
)(FooterComponent)
