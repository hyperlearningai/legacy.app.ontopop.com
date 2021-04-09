import React from 'react'
import { connect } from 'redux-zero/react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import {
  BsFillCircleFill,
  BsSearch,
  BsArrowUpRight
} from 'react-icons/bs'
import actions from '../store/actions'
import { SIDEBAR_VIEW_ENTRY_SEARCH } from '../constants/views'
import { DISPLAYED_RESULTS_PER_PAGE } from '../constants/search'

const Navbar = ({
  availableNodesCount,
  availableEdgesCount,
  totalSearchCount,
  sidebarView,
  searchPageSelected,
  entrySearchResultsByPage,
}) => {
  const { t } = useTranslation()

  const displayedSearchResults = entrySearchResultsByPage[searchPageSelected]

  const firstSearchCount = displayedSearchResults && displayedSearchResults.length > 0 ? (searchPageSelected * DISPLAYED_RESULTS_PER_PAGE) + 1 : 0
  const lastSearchCount = displayedSearchResults && displayedSearchResults.length > 0 ? firstSearchCount + displayedSearchResults.length - 1 : 0

  const entrySearchResultRange = `${firstSearchCount}${lastSearchCount > 0 ? `-${lastSearchCount}` : ''}`

  return (
    <nav>
      <div className="nav-left">
        {
          (sidebarView === SIDEBAR_VIEW_ENTRY_SEARCH) ? (
            <span>
              <BsSearch className="nodes-icon node m-r-5" />
              {`${t('searchResults')}: ${entrySearchResultRange} ${t('of')} ${totalSearchCount}`}
            </span>
          ) : (
            <span>
              <BsFillCircleFill className="nodes-icon node m-r-5" />
              {`${t('nodes')}: ${availableNodesCount}`}
              <span className="m-l-5 m-r-5">|</span>
              <BsArrowUpRight className="nodes-icon edge" />
              {`${t('edges')}: ${availableEdgesCount}`}
            </span>
          )
        }
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  availableNodesCount: PropTypes.number.isRequired,
  availableEdgesCount: PropTypes.number.isRequired,
  sidebarView: PropTypes.string.isRequired,
  totalSearchCount: PropTypes.number.isRequired,
  searchPageSelected: PropTypes.number.isRequired,
  entrySearchResultsByPage: PropTypes.shape().isRequired,
}

const mapToProps = ({
  availableNodesCount,
  availableEdgesCount,
  sidebarView,
  totalSearchCount,
  searchPageSelected,
  entrySearchResultsByPage,
}) => ({
  availableNodesCount,
  availableEdgesCount,
  sidebarView,
  totalSearchCount,
  searchPageSelected,
  entrySearchResultsByPage,
})

export default connect(
  mapToProps,
  actions
)(Navbar)
