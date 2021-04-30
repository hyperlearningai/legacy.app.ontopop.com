import React from 'react'
import { connect } from 'redux-zero/react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import {
  BsFillCircleFill,
  BsSearch,
  BsArrowUpRight,
  BsTable
} from 'react-icons/bs'
import { BiNetworkChart } from 'react-icons/bi'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import {
  NETWORK_VIEW_DATATABLE, NETWORK_VIEW_GRAPH, SIDEBAR_VIEW_ENTRY_SEARCH, SIDEBAR_VIEW_GRAPHS
} from '../constants/views'
import { DISPLAYED_RESULTS_PER_PAGE } from '../constants/search'
import { OPERATION_TYPE_UPDATE } from '../constants/store'

const Navbar = ({
  availableNodesCount,
  availableEdgesCount,
  totalSearchCount,
  sidebarView,
  searchPageSelected,
  entrySearchResultsByPage,
  updateStoreValue,
  networkVisualisation
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
            <div className="flex">
              <BsSearch className="nodes-icon node m-r-5" />
              {`${t('searchResults')}: ${entrySearchResultRange} ${t('of')} ${totalSearchCount}`}
            </div>
          ) : (
            <div className="flex">
              <BsFillCircleFill className="nodes-icon node m-r-5" />
              {`${t('nodes')}: ${availableNodesCount}`}
              <span className="m-l-5 m-r-5">|</span>
              <BsArrowUpRight className="nodes-icon edge" />
              {`${t('edges')}: ${availableEdgesCount}`}
            </div>
          )
        }
      </div>

      {
          sidebarView === SIDEBAR_VIEW_GRAPHS && (
            <div className="nav-right">
              <Button
                aria-label={t('showNetworkGraph')}
                tooltip={t('showNetworkGraph')}
                tooltipOptions={{ position: 'top' }}
                id="navbar-network-graph-btn"
                className={networkVisualisation === NETWORK_VIEW_GRAPH ? 'nav-right-button-selected' : ''}
                onClick={() => updateStoreValue(['networkVisualisation'], OPERATION_TYPE_UPDATE, NETWORK_VIEW_GRAPH)}
              >
                <BiNetworkChart />
              </Button>
              <Button
                aria-label={t('showDataTable')}
                tooltip={t('showDataTable')}
                tooltipOptions={{ position: 'top' }}
                id="navbar-datatable-btn"
                className={networkVisualisation === NETWORK_VIEW_DATATABLE ? 'nav-right-button-selected' : ''}
                onClick={() => updateStoreValue(['networkVisualisation'], OPERATION_TYPE_UPDATE, NETWORK_VIEW_DATATABLE)}
              >
                <BsTable />
              </Button>
            </div>
          )
        }
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
  updateStoreValue: PropTypes.func.isRequired,
  networkVisualisation: PropTypes.string.isRequired,
}

const mapToProps = ({
  availableNodesCount,
  availableEdgesCount,
  sidebarView,
  totalSearchCount,
  searchPageSelected,
  entrySearchResultsByPage,
  networkVisualisation
}) => ({
  availableNodesCount,
  availableEdgesCount,
  sidebarView,
  totalSearchCount,
  searchPageSelected,
  entrySearchResultsByPage,
  networkVisualisation
})

export default connect(
  mapToProps,
  actions
)(Navbar)
