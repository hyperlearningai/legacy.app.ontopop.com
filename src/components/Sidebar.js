import React from 'react'
import { connect } from 'redux-zero/react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import {
  FiLayers,
  FiSettings
} from 'react-icons/fi'
import {
  BiNetworkChart,
  BiSelection
} from 'react-icons/bi'
import {
  BsSearch,
  BsArrowUpRight,
  BsFilter,
  BsPencilSquare,
  BsCodeSlash
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
  FaFileExport,
  FaGitAlt,
  FaPaintBrush
} from 'react-icons/fa'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import {
  SIDEBAR_VIEW_GRAPHS,
  SIDEBAR_VIEW_FREE_TEXT_SEARCH,
  SIDEBAR_VIEW_NEIGHBOURHOOD,
  SIDEBAR_VIEW_SHORTEST_PATH,
  SIDEBAR_VIEW_NODES_SELECTION,
  SIDEBAR_VIEW_EDGES_SELECTION,
  SIDEBAR_VIEW_SETTINGS,
  SIDEBAR_VIEW_EXPORT,
  SIDEBAR_VIEW_BOUNDING_BOX,
  SIDEBAR_VIEW_NODES_FILTER,
  SIDEBAR_VIEW_EDGES_FILTER,
  SIDEBAR_VIEW_CUSTOM_QUERY,
  SIDEBAR_VIEW_VERSIONING,
  SIDEBAR_VIEW_EDIT_ONTOLOGY,
  SIDEBAR_VIEW_STYLING
} from '../constants/views'
import NetworkGraphList from './NetworkGraphList'
import FreeTextSearch from './FreeTextSearch'
import NodeNeighbourhood from './NodeNeighbourhood'
import NodesSelection from './NodesSelection'
import EdgesSelection from './EdgesSelection'
import NetworkSettings from './NetworkSettings'
import ExportSettings from './ExportSettings'
import ShortestPath from './ShortestPath'
import BoundingBoxSelection from './BoundingBoxSelection'
import NodesFilter from './NodesFilter'
import EdgesFilter from './EdgesFilter'
import CustomQuery from './CustomQuery'
import Versioning from './Versioning'
import EditOntology from './EditOntology'
import NetworkStyling from './NetworkStyling'

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
          tooltip={t(SIDEBAR_VIEW_GRAPHS)}
          className={sidebarView === SIDEBAR_VIEW_GRAPHS ? 'sidebar-bar-button-selected' : ''}
          onClick={() => setView(SIDEBAR_VIEW_GRAPHS)}
        >
          <FiLayers />
        </Button>
        <Button
          tooltip={t(SIDEBAR_VIEW_FREE_TEXT_SEARCH)}
          className={sidebarView === SIDEBAR_VIEW_FREE_TEXT_SEARCH ? 'sidebar-bar-button-selected' : ''}
          onClick={() => setView(SIDEBAR_VIEW_FREE_TEXT_SEARCH)}
        >
          <BsSearch />
        </Button>
        <Button
          tooltip={t(SIDEBAR_VIEW_NODES_SELECTION)}
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
          tooltip={t(SIDEBAR_VIEW_EDGES_SELECTION)}
          className={sidebarView === SIDEBAR_VIEW_EDGES_SELECTION ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setStoreState('isEdgeSelectable', true)
            setView(SIDEBAR_VIEW_EDGES_SELECTION)
          }}
        >
          <BsArrowUpRight />
          <FaRegHandPointer />
        </Button>
        <Button
          tooltip={t(SIDEBAR_VIEW_NODES_FILTER)}
          className={sidebarView === SIDEBAR_VIEW_NODES_FILTER ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setStoreState('isNodeSelectable', true)
            setView(SIDEBAR_VIEW_NODES_FILTER)
          }}
        >
          <FaRegCircle />
          <BsFilter />
        </Button>
        <Button
          tooltip={t(SIDEBAR_VIEW_EDGES_FILTER)}
          className={sidebarView === SIDEBAR_VIEW_EDGES_FILTER ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setStoreState('isEdgeSelectable', true)
            setView(SIDEBAR_VIEW_EDGES_FILTER)
          }}
        >
          <BsArrowUpRight />
          <BsFilter />
        </Button>
        <Button
          tooltip={t(SIDEBAR_VIEW_BOUNDING_BOX)}
          className={sidebarView === SIDEBAR_VIEW_BOUNDING_BOX ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setStoreState('isBoundingBox', true)
            setView(SIDEBAR_VIEW_BOUNDING_BOX)
          }}
        >
          <BiSelection />
        </Button>
        <Button
          tooltip={t(SIDEBAR_VIEW_NEIGHBOURHOOD)}
          className={sidebarView === SIDEBAR_VIEW_NEIGHBOURHOOD ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setStoreState('isNeighbourNodeSelectable', true)
            setView(SIDEBAR_VIEW_NEIGHBOURHOOD)
          }}
        >
          <BiNetworkChart />
        </Button>
        <Button
          tooltip={t(SIDEBAR_VIEW_SHORTEST_PATH)}
          className={sidebarView === SIDEBAR_VIEW_SHORTEST_PATH ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setStoreState('isShortestPathNode1Selectable', true)
            setView(SIDEBAR_VIEW_SHORTEST_PATH)
          }}
        >
          <IoGitNetwork />
        </Button>
        <Button
          tooltip={t(SIDEBAR_VIEW_CUSTOM_QUERY)}
          className={sidebarView === SIDEBAR_VIEW_CUSTOM_QUERY ? 'sidebar-bar-button-selected' : ''}
          onClick={() => setView(SIDEBAR_VIEW_CUSTOM_QUERY)}
        >
          <BsCodeSlash />
        </Button>
        <Button
          tooltip={t(SIDEBAR_VIEW_SETTINGS)}
          className={sidebarView === SIDEBAR_VIEW_SETTINGS ? 'sidebar-bar-button-selected' : ''}
          onClick={() => setView(SIDEBAR_VIEW_SETTINGS)}
        >
          <FiSettings />
        </Button>
        <Button
          tooltip={t(SIDEBAR_VIEW_STYLING)}
          className={sidebarView === SIDEBAR_VIEW_STYLING ? 'sidebar-bar-button-selected' : ''}
          onClick={() => setView(SIDEBAR_VIEW_STYLING)}
        >
          <FaPaintBrush />
        </Button>
        <Button
          tooltip={t(SIDEBAR_VIEW_EXPORT)}
          className={sidebarView === SIDEBAR_VIEW_EXPORT ? 'sidebar-bar-button-selected' : ''}
          onClick={() => setView(SIDEBAR_VIEW_EXPORT)}
        >
          <FaFileExport />
        </Button>
        <Button
          tooltip={t(SIDEBAR_VIEW_VERSIONING)}
          className={sidebarView === SIDEBAR_VIEW_VERSIONING ? 'sidebar-bar-button-selected' : ''}
          onClick={() => setView(SIDEBAR_VIEW_VERSIONING)}
        >
          <FaGitAlt />
        </Button>
        <Button
          tooltip={t(SIDEBAR_VIEW_EDIT_ONTOLOGY)}
          className={sidebarView === SIDEBAR_VIEW_EDIT_ONTOLOGY ? 'sidebar-bar-button-selected' : ''}
          onClick={() => setView(SIDEBAR_VIEW_EDIT_ONTOLOGY)}
        >
          <BsPencilSquare />
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
              sidebarView === SIDEBAR_VIEW_FREE_TEXT_SEARCH && (
                <FreeTextSearch />
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
              sidebarView === SIDEBAR_VIEW_NODES_FILTER && (
                <NodesFilter />
              )
            }

            {
              sidebarView === SIDEBAR_VIEW_EDGES_FILTER && (
                <EdgesFilter />
              )
            }

            {
              sidebarView === SIDEBAR_VIEW_BOUNDING_BOX && (
                <BoundingBoxSelection />
              )
            }

            {
              sidebarView === SIDEBAR_VIEW_NEIGHBOURHOOD && (
                <NodeNeighbourhood />
              )
            }

            {
              sidebarView === SIDEBAR_VIEW_SHORTEST_PATH && (
                <ShortestPath />
              )
            }

            {
              sidebarView === SIDEBAR_VIEW_CUSTOM_QUERY && (
                <CustomQuery />
              )
            }

            {
              sidebarView === SIDEBAR_VIEW_SETTINGS && (
                <NetworkSettings />
              )
            }

            {
              sidebarView === SIDEBAR_VIEW_STYLING && (
                <NetworkStyling />
              )
            }

            {
              sidebarView === SIDEBAR_VIEW_EXPORT && (
                <ExportSettings />
              )
            }

            {
              sidebarView === SIDEBAR_VIEW_VERSIONING && (
                <Versioning />
              )
            }

            {
              sidebarView === SIDEBAR_VIEW_EDIT_ONTOLOGY && (
                <EditOntology />
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
