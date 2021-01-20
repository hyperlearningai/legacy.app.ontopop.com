import React from 'react'
import { connect } from 'redux-zero/react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import {
  FiLayers,
  FiSettings
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
  IoGitNetwork
} from 'react-icons/io5'
import {
  FaRegHandPointer,
  FaRegCircle,
  FaFileExport
} from 'react-icons/fa'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import {
  SIDEBAR_VIEW_GRAPHS,
  SIDEBAR_VIEW_SEARCH,
  SIDEBAR_VIEW_NEIGHBOURHOOD,
  SIDEBAR_VIEW_SHORTEST_PATH,
  SIDEBAR_VIEW_NODES_SELECTION,
  SIDEBAR_VIEW_EDGES_SELECTION,
  SIDEBAR_VIEW_SETTINGS,
  SIDEBAR_VIEW_EXPORT
} from '../constants/views'
import NetworkGraphList from './NetworkGraphList'
import NodeNeighbourhood from './NodeNeighbourhood'
import NodesSelection from './NodesSelection'
import EdgesSelection from './EdgesSelection'
import NetworkSettings from './NetworkSettings'
import ExportSettings from './ExportSettings'

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
        <Button
          tooltip={t('networkGraphs')}
          className={sidebarView === SIDEBAR_VIEW_GRAPHS ? 'sidebar-bar-button-selected' : ''}
          onClick={() => setView(SIDEBAR_VIEW_GRAPHS)}
        >
          <FiLayers />
        </Button>
        <Button
          tooltip={t('search')}
          className={sidebarView === SIDEBAR_VIEW_SEARCH ? 'sidebar-bar-button-selected' : ''}
          onClick={() => setView(SIDEBAR_VIEW_SEARCH)}
        >
          <BsSearch />
        </Button>
        <Button
          tooltip={t('selectNodes')}
          className={sidebarView === SIDEBAR_VIEW_NODES_SELECTION ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setStoreState('isNodeSelectable', true)
            setView(SIDEBAR_VIEW_NODES_SELECTION)
          }}
        >
          <FaRegCircle />
          <FaRegHandPointer />
        </Button>
        <Button
          tooltip={t('selectEdges')}
          className={sidebarView === SIDEBAR_VIEW_EDGES_SELECTION ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setStoreState('isEdgeSelectable', true)
            setView(SIDEBAR_VIEW_EDGES_SELECTION)
          }}
        >
          <BsArrowUpDown />
          <FaRegHandPointer />
        </Button>
        <Button
          tooltip={t('nodeNeighbourhood')}
          className={sidebarView === SIDEBAR_VIEW_NEIGHBOURHOOD ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setStoreState('isNeighbourNodeSelectable', true)
            setView(SIDEBAR_VIEW_NEIGHBOURHOOD)
          }}
        >
          <BiNetworkChart />
        </Button>
        <Button
          tooltip={t('shortestPath')}
          className={sidebarView === SIDEBAR_VIEW_SHORTEST_PATH ? 'sidebar-bar-button-selected' : ''}
          onClick={() => setView(SIDEBAR_VIEW_SHORTEST_PATH)}
        >
          <IoGitNetwork />
        </Button>
        <Button
          tooltip={t('settings')}
          className={sidebarView === SIDEBAR_VIEW_SETTINGS ? 'sidebar-bar-button-selected' : ''}
          onClick={() => setView(SIDEBAR_VIEW_SETTINGS)}
        >
          <FiSettings />
        </Button>
        <Button
          tooltip={t('export')}
          className={sidebarView === SIDEBAR_VIEW_EXPORT ? 'sidebar-bar-button-selected' : ''}
          onClick={() => setView(SIDEBAR_VIEW_EXPORT)}
        >
          <FaFileExport />
        </Button>
        <Button
          tooltip={t('toggleSidebar')}
          onClick={() => setStoreState('isSidebarOpen', !isSidebarOpen)}
        >
          {
            isSidebarOpen ? (
              <AiOutlineArrowLeft />
            ) : (
              <AiOutlineArrowRight />
            )
          }
        </Button>
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

            {
              sidebarView === SIDEBAR_VIEW_SETTINGS && (
                <NetworkSettings />
              )
            }

            {
              sidebarView === SIDEBAR_VIEW_EXPORT && (
                <ExportSettings />
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
