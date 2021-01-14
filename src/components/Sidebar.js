import React from 'react'
import { connect } from 'redux-zero/react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import {
  FiLayers
} from 'react-icons/fi'
import {
  BiNetworkChart
} from 'react-icons/bi'
import {
  BsSearch,
  BsArrowUpDown
} from 'react-icons/bs'
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight
} from 'react-icons/ai'
import {
  RiSpeedLine
} from 'react-icons/ri'
import {
  FaRegHandPointer,
  FaRegCircle
} from 'react-icons/fa'
import actions from '../store/actions'
import {
  SIDEBAR_VIEW_GRAPHS,
  SIDEBAR_VIEW_SEARCH,
  SIDEBAR_VIEW_NEIGHBOURHOOD,
  SIDEBAR_VIEW_SHORTEST_PATH,
  SIDEBAR_VIEW_NODES_SELECTION,
  SIDEBAR_VIEW_EDGES_SELECTION
} from '../constants/views'
import NetworkGraphList from './NetworkGraphList'
import NodeNeighbourhood from './NodeNeighbourhood'
import NodesSelection from './NodesSelection'
import EdgesSelection from './EdgesSelection'

const Sidebar = ({
  isSidebarOpen,
  sidebarView,
  setStoreState,
}) => {
  const { t } = useTranslation()

  const setView = (view) => {
    setStoreState('isSidebarOpen', true)
    setStoreState('sidebarView', view)
  }

  return (
    <aside className={`sidebar${isSidebarOpen ? '' : '-closed'}`}>
      <div className="sidebar-icons">
        <button
          type="button"
          title={t('networkGraphs')}
          className={sidebarView === SIDEBAR_VIEW_GRAPHS ? 'sidebar-bar-button-selected' : ''}
          onClick={() => setView(SIDEBAR_VIEW_GRAPHS)}
        >
          <FiLayers />
        </button>
        <button
          type="button"
          title={t('search')}
          className={sidebarView === SIDEBAR_VIEW_SEARCH ? 'sidebar-bar-button-selected' : ''}
          onClick={() => setView(SIDEBAR_VIEW_SEARCH)}
        >
          <BsSearch />
        </button>
        <button
          type="button"
          title={t('selectNodes')}
          className={sidebarView === SIDEBAR_VIEW_NODES_SELECTION ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setStoreState('isNodeSelectable', true)
            setView(SIDEBAR_VIEW_NODES_SELECTION)
          }}
        >
          <FaRegCircle />
          <FaRegHandPointer />
        </button>
        <button
          type="button"
          title={t('selectEdges')}
          className={sidebarView === SIDEBAR_VIEW_EDGES_SELECTION ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setStoreState('isEdgeSelectable', true)
            setView(SIDEBAR_VIEW_EDGES_SELECTION)
          }}
        >
          <BsArrowUpDown />
          <FaRegHandPointer />
        </button>
        <button
          type="button"
          title={t('nodeNeighbourhood')}
          className={sidebarView === SIDEBAR_VIEW_NEIGHBOURHOOD ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setStoreState('isNeighbourNodeSelectable', true)
            setView(SIDEBAR_VIEW_NEIGHBOURHOOD)
          }}
        >
          <BiNetworkChart />
        </button>
        <button
          type="button"
          title={t('shortestPath')}
          className={sidebarView === SIDEBAR_VIEW_SHORTEST_PATH ? 'sidebar-bar-button-selected' : ''}
          onClick={() => setView(SIDEBAR_VIEW_SHORTEST_PATH)}
        >
          <RiSpeedLine />
        </button>
        <button
          type="button"
          title={t('toggleSidebar')}
          onClick={() => setStoreState('isSidebarOpen', !isSidebarOpen)}
        >
          {
            isSidebarOpen ? (
              <AiOutlineArrowLeft />
            ) : (
              <AiOutlineArrowRight />
            )
          }
        </button>
      </div>

      {
        isSidebarOpen && (
          <div className="sidebar-main">
            {
              sidebarView === SIDEBAR_VIEW_GRAPHS && (
                <NetworkGraphList />
              )
            }

            {
              sidebarView === SIDEBAR_VIEW_NODES_SELECTION && (
                <NodesSelection />
              )
            }

            {
              sidebarView === SIDEBAR_VIEW_EDGES_SELECTION && (
                <EdgesSelection />
              )
            }

            {
              sidebarView === SIDEBAR_VIEW_NEIGHBOURHOOD && (
                <NodeNeighbourhood />
              )
            }
          </div>
        )
      }
    </aside>
  )
}

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  sidebarView: PropTypes.string.isRequired,
  setStoreState: PropTypes.func.isRequired,
}

const mapToProps = ({
  sidebarView,
  isSidebarOpen
}) => ({
  sidebarView,
  isSidebarOpen
})

export default connect(
  mapToProps,
  actions
)(Sidebar)
