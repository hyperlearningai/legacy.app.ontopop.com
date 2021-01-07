import React from 'react';
import { connect } from 'redux-zero/react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import {
  // BsLayoutSidebar,
  // BsLayoutSidebarInset,
  BsSearch,
  // BsTable
} from 'react-icons/bs'
// import {
//   BiNetworkChart
// } from 'react-icons/bi'
import {
  ImInfo
} from 'react-icons/im'
import actions from '../store/actions'
// import {
//   // NETWORK_GRAPH_VIEW,
//   TABLE_VIEW
// } from '../constants/views'

const Navbar = ({
  // isSidebarOpen,
  setStoreState,
  isSearchOpen,
  // mainView,
  isInfoOpen,
}) => {
  const { t } = useTranslation()

  return (
    <nav>
      <div className="nav-left">
        <button
          type="button"
          title={t(isInfoOpen ? 'hideInfo' : 'showInfo')}
          className={isInfoOpen ? 'nav-left-button-selected' : ''}
          onClick={() => setStoreState('isInfoOpen', !isInfoOpen)}
        >
          <ImInfo />
        </button>

        {/* <button
          type="button"
          title={t(isSidebarOpen ? 'hideSidebar' : 'showSidebar')}
          onClick={() => setStoreState('isSidebarOpen', !isSidebarOpen)}
        >
          {
            isSidebarOpen ? (
              <BsLayoutSidebar />
            ) : (
              <BsLayoutSidebarInset />
            )
          }
        </button> */}
      </div>

      <div className="nav-right">
        {/* <button
          type="button"
          title={t('showNetworkGraph')}
          className={mainView === NETWORK_GRAPH_VIEW ? 'nav-right-button-selected' : ''}
          onClick={() => setStoreState('mainView', NETWORK_GRAPH_VIEW)}
        >
          <BiNetworkChart />
        </button>

        <button
          type="button"
          title={t('showTable')}
          className={mainView === TABLE_VIEW ? 'nav-right-button-selected' : ''}
          onClick={() => setStoreState('mainView', TABLE_VIEW)}
        >
          <BsTable />
        </button> */}

        <button
          type="button"
          title={t('search')}
          className={isSearchOpen ? 'nav-right-button-selected' : ''}
          onClick={() => {
            setStoreState('selectedNode', undefined)
            setStoreState('isSearchOpen', !isSearchOpen)
          }}
        >
          <BsSearch />
        </button>
      </div>
    </nav>
  )
};

Navbar.propTypes = {
  // isSidebarOpen: PropTypes.bool.isRequired,
  isInfoOpen: PropTypes.bool.isRequired,
  isSearchOpen: PropTypes.bool.isRequired,
  setStoreState: PropTypes.func.isRequired,
}

const mapToProps = ({
  isSidebarOpen,
  // mainView,
  isInfoOpen,
  isSearchOpen
}) => ({
  isSidebarOpen,
  // mainView,
  isInfoOpen,
  isSearchOpen
})

export default connect(
  mapToProps,
  actions
)(Navbar)
