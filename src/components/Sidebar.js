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
  BiSelection,
  BiText
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
  IoGitNetwork,
  IoBuildSharp,
} from 'react-icons/io5'
import {
  IoMdOptions
} from 'react-icons/io'
import {
  FaRegHandPointer,
  FaRegCircle,
  FaFileExport,
  FaPaintBrush,
  FaStickyNote,
  FaFileAlt
} from 'react-icons/fa'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import {
  SIDEBAR_VIEW_ENTRY_SEARCH,
  SIDEBAR_VIEW_GRAPHS,
  SIDEBAR_VIEW_GRAPH_OPTIONS,
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
  SIDEBAR_VIEW_EDIT_ONTOLOGY,
  SIDEBAR_VIEW_STYLING,
  SIDEBAR_VIEW_STRUCTURED_SEARCH,
  MAIN_VIEW_SEARCH,
  MAIN_VIEW_GRAPH,
  SIDEBAR_VIEW_NOTES, SIDEBAR_VIEW_SYNONYMS
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
import EditOntology from './EditOntology'
import NetworkStyling from './NetworkStyling'
import StructuredSearch from './StructuredSearch'
import NotesList from './NotesList'
import EntrySearch from './EntrySearch'
import SynonymsList from './SynonymsList'
import NetworkGraphOptions from './NetworkGraphOptions'
import { OPERATION_TYPE_UPDATE } from '../constants/store'

const Sidebar = ({
  isSidebarOpen,
  sidebarView,
  updateStoreValue,
}) => {
  const { t } = useTranslation()

  const setView = (view) => {
    updateStoreValue(['isSidebarOpen'], OPERATION_TYPE_UPDATE, true)
    updateStoreValue(['sidebarView'], OPERATION_TYPE_UPDATE, view)
  }

  return (
    <aside className={`sidebar${isSidebarOpen ? '' : '-closed'}`}>
      <div className="sidebar-icons">
        <Button
          aria-label={t(SIDEBAR_VIEW_ENTRY_SEARCH)}
          tooltip={t(SIDEBAR_VIEW_ENTRY_SEARCH)}
          id="sidebar-button-search"
          className={sidebarView === SIDEBAR_VIEW_ENTRY_SEARCH ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setView(SIDEBAR_VIEW_ENTRY_SEARCH)
            updateStoreValue(['mainVisualisation'], OPERATION_TYPE_UPDATE, MAIN_VIEW_SEARCH)
          }}
        >
          <BsSearch />
        </Button>
        <Button
          aria-label={t(SIDEBAR_VIEW_GRAPHS)}
          id="sidebar-button-graphs"
          tooltip={t(SIDEBAR_VIEW_GRAPHS)}
          className={sidebarView === SIDEBAR_VIEW_GRAPHS ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setView(SIDEBAR_VIEW_GRAPHS)
            updateStoreValue(['mainVisualisation'], OPERATION_TYPE_UPDATE, MAIN_VIEW_GRAPH)
          }}
        >
          <FiLayers />
        </Button>
        <Button
          aria-label={t(SIDEBAR_VIEW_GRAPH_OPTIONS)}
          id="sidebar-button-graph-options"
          tooltip={t(SIDEBAR_VIEW_GRAPH_OPTIONS)}
          className={sidebarView === SIDEBAR_VIEW_GRAPH_OPTIONS ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setView(SIDEBAR_VIEW_GRAPH_OPTIONS)
            updateStoreValue(['mainVisualisation'], OPERATION_TYPE_UPDATE, MAIN_VIEW_GRAPH)
          }}
        >
          <IoMdOptions />
        </Button>
        <Button
          aria-label={t(SIDEBAR_VIEW_FREE_TEXT_SEARCH)}
          id="sidebar-button-free-text-search"
          tooltip={t(SIDEBAR_VIEW_FREE_TEXT_SEARCH)}
          className={sidebarView === SIDEBAR_VIEW_FREE_TEXT_SEARCH ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setView(SIDEBAR_VIEW_FREE_TEXT_SEARCH)
            updateStoreValue(['mainVisualisation'], OPERATION_TYPE_UPDATE, MAIN_VIEW_GRAPH)
          }}
        >
          <BsSearch />
          <BiText />
        </Button>
        <Button
          aria-label={t(SIDEBAR_VIEW_STRUCTURED_SEARCH)}
          id="sidebar-button-structured-search"
          tooltip={t(SIDEBAR_VIEW_STRUCTURED_SEARCH)}
          className={sidebarView === SIDEBAR_VIEW_STRUCTURED_SEARCH ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setView(SIDEBAR_VIEW_STRUCTURED_SEARCH)
            updateStoreValue(['mainVisualisation'], OPERATION_TYPE_UPDATE, MAIN_VIEW_GRAPH)
          }}
        >
          <BsSearch />
          <IoBuildSharp />
        </Button>
        <Button
          aria-label={t(SIDEBAR_VIEW_NODES_SELECTION)}
          id="sidebar-button-nodes-selection"
          tooltip={t(SIDEBAR_VIEW_NODES_SELECTION)}
          className={sidebarView === SIDEBAR_VIEW_NODES_SELECTION ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            // updateStoreValue(['isNodeSelectable'], OPERATION_TYPE_UPDATE, true)
            setView(SIDEBAR_VIEW_NODES_SELECTION)
            updateStoreValue(['mainVisualisation'], OPERATION_TYPE_UPDATE, MAIN_VIEW_GRAPH)
          }}
        >
          <FaRegCircle />
          <FaRegHandPointer />
        </Button>
        <Button
          aria-label={t(SIDEBAR_VIEW_EDGES_SELECTION)}
          id="sidebar-button-edges-selection"
          tooltip={t(SIDEBAR_VIEW_EDGES_SELECTION)}
          className={sidebarView === SIDEBAR_VIEW_EDGES_SELECTION ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            // updateStoreValue(['isEdgeSelectable'], OPERATION_TYPE_UPDATE, true)
            setView(SIDEBAR_VIEW_EDGES_SELECTION)
            updateStoreValue(['mainVisualisation'], OPERATION_TYPE_UPDATE, MAIN_VIEW_GRAPH)
          }}
        >
          <BsArrowUpRight />
          <FaRegHandPointer />
        </Button>
        <Button
          aria-label={t(SIDEBAR_VIEW_NODES_FILTER)}
          id="sidebar-button-nodes-filter"
          tooltip={t(SIDEBAR_VIEW_NODES_FILTER)}
          className={sidebarView === SIDEBAR_VIEW_NODES_FILTER ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            // updateStoreValue(['isNodeSelectable'], OPERATION_TYPE_UPDATE, true)
            setView(SIDEBAR_VIEW_NODES_FILTER)
            updateStoreValue(['mainVisualisation'], OPERATION_TYPE_UPDATE, MAIN_VIEW_GRAPH)
          }}
        >
          <FaRegCircle />
          <BsFilter />
        </Button>
        <Button
          aria-label={t(SIDEBAR_VIEW_EDGES_FILTER)}
          id="sidebar-button-edges-filter"
          tooltip={t(SIDEBAR_VIEW_EDGES_FILTER)}
          className={sidebarView === SIDEBAR_VIEW_EDGES_FILTER ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            // updateStoreValue(['isEdgeSelectable'], OPERATION_TYPE_UPDATE, true)
            setView(SIDEBAR_VIEW_EDGES_FILTER)
            updateStoreValue(['mainVisualisation'], OPERATION_TYPE_UPDATE, MAIN_VIEW_GRAPH)
          }}
        >
          <BsArrowUpRight />
          <BsFilter />
        </Button>
        <Button
          aria-label={t(SIDEBAR_VIEW_BOUNDING_BOX)}
          id="sidebar-button-bounding-box"
          tooltip={t(SIDEBAR_VIEW_BOUNDING_BOX)}
          className={sidebarView === SIDEBAR_VIEW_BOUNDING_BOX ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            updateStoreValue(['isBoundingBox'], OPERATION_TYPE_UPDATE, true)
            setView(SIDEBAR_VIEW_BOUNDING_BOX)
            updateStoreValue(['mainVisualisation'], OPERATION_TYPE_UPDATE, MAIN_VIEW_GRAPH)
          }}
        >
          <BiSelection />
        </Button>
        <Button
          aria-label={t(SIDEBAR_VIEW_NEIGHBOURHOOD)}
          id="sidebar-button-node-neighbourhood"
          tooltip={t(SIDEBAR_VIEW_NEIGHBOURHOOD)}
          className={sidebarView === SIDEBAR_VIEW_NEIGHBOURHOOD ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            // updateStoreValue(['isNeighbourNodeSelectable'], OPERATION_TYPE_UPDATE, true)
            setView(SIDEBAR_VIEW_NEIGHBOURHOOD)
            updateStoreValue(['mainVisualisation'], OPERATION_TYPE_UPDATE, MAIN_VIEW_GRAPH)
          }}
        >
          <BiNetworkChart />
        </Button>
        <Button
          aria-label={t(SIDEBAR_VIEW_SHORTEST_PATH)}
          id="sidebar-button-shortest-path"
          tooltip={t(SIDEBAR_VIEW_SHORTEST_PATH)}
          className={sidebarView === SIDEBAR_VIEW_SHORTEST_PATH ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            updateStoreValue(['isElementSelectable'], OPERATION_TYPE_UPDATE, false)
            updateStoreValue(['isShortestPathNode1Selectable'], OPERATION_TYPE_UPDATE, true)
            setView(SIDEBAR_VIEW_SHORTEST_PATH)
            updateStoreValue(['mainVisualisation'], OPERATION_TYPE_UPDATE, MAIN_VIEW_GRAPH)
          }}
        >
          <IoGitNetwork />
        </Button>
        <Button
          aria-label={t(SIDEBAR_VIEW_CUSTOM_QUERY)}
          id="sidebar-button-custom-query"
          tooltip={t(SIDEBAR_VIEW_CUSTOM_QUERY)}
          className={sidebarView === SIDEBAR_VIEW_CUSTOM_QUERY ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setView(SIDEBAR_VIEW_CUSTOM_QUERY)
            updateStoreValue(['mainVisualisation'], OPERATION_TYPE_UPDATE, MAIN_VIEW_GRAPH)
          }}
        >
          <BsCodeSlash />
        </Button>
        <Button
          aria-label={t(SIDEBAR_VIEW_SETTINGS)}
          id="sidebar-button-physics-settings"
          tooltip={t(SIDEBAR_VIEW_SETTINGS)}
          className={sidebarView === SIDEBAR_VIEW_SETTINGS ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setView(SIDEBAR_VIEW_SETTINGS)
            updateStoreValue(['mainVisualisation'], OPERATION_TYPE_UPDATE, MAIN_VIEW_GRAPH)
          }}
        >
          <FiSettings />
        </Button>
        <Button
          aria-label={t(SIDEBAR_VIEW_STYLING)}
          id="sidebar-button-view-styling"
          tooltip={t(SIDEBAR_VIEW_STYLING)}
          className={sidebarView === SIDEBAR_VIEW_STYLING ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setView(SIDEBAR_VIEW_STYLING)
            updateStoreValue(['mainVisualisation'], OPERATION_TYPE_UPDATE, MAIN_VIEW_GRAPH)
          }}
        >
          <FaPaintBrush />
        </Button>
        <Button
          aria-label={t(SIDEBAR_VIEW_NOTES)}
          id="sidebar-button-notes"
          tooltip={t(SIDEBAR_VIEW_NOTES)}
          className={sidebarView === SIDEBAR_VIEW_NOTES ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setView(SIDEBAR_VIEW_NOTES)
            updateStoreValue(['mainVisualisation'], OPERATION_TYPE_UPDATE, MAIN_VIEW_GRAPH)
          }}
        >
          <FaStickyNote />
        </Button>
        <Button
          aria-label={t(SIDEBAR_VIEW_SYNONYMS)}
          tooltip={t(SIDEBAR_VIEW_SYNONYMS)}
          id="sidebar-button-synonims"
          className={sidebarView === SIDEBAR_VIEW_SYNONYMS ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setView(SIDEBAR_VIEW_SYNONYMS)
            updateStoreValue(['mainVisualisation'], OPERATION_TYPE_UPDATE, MAIN_VIEW_GRAPH)
          }}
        >
          <FaFileAlt />
        </Button>
        <Button
          aria-label={t(SIDEBAR_VIEW_EXPORT)}
          id="sidebar-button-export"
          tooltip={t(SIDEBAR_VIEW_EXPORT)}
          className={sidebarView === SIDEBAR_VIEW_EXPORT ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setView(SIDEBAR_VIEW_EXPORT)
            updateStoreValue(['mainVisualisation'], OPERATION_TYPE_UPDATE, MAIN_VIEW_GRAPH)
          }}
        >
          <FaFileExport />
        </Button>
        <Button
          aria-label={t(SIDEBAR_VIEW_EDIT_ONTOLOGY)}
          id="sidebar-button-edit-ontology"
          tooltip={t(SIDEBAR_VIEW_EDIT_ONTOLOGY)}
          className={sidebarView === SIDEBAR_VIEW_EDIT_ONTOLOGY ? 'sidebar-bar-button-selected' : ''}
          onClick={() => {
            setView(SIDEBAR_VIEW_EDIT_ONTOLOGY)
            updateStoreValue(['mainVisualisation'], OPERATION_TYPE_UPDATE, MAIN_VIEW_GRAPH)
          }}
        >
          <BsPencilSquare />
        </Button>
        <Button
          aria-label={t('toggleSidebar')}
          id="sidebar-button-toggle"
          tooltip={t('toggleSidebar')}
          onClick={() => updateStoreValue(['isSidebarOpen'], OPERATION_TYPE_UPDATE, !isSidebarOpen)}
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
              sidebarView === SIDEBAR_VIEW_ENTRY_SEARCH && (
                <EntrySearch />
              )
            }

            {
              sidebarView === SIDEBAR_VIEW_GRAPHS && (
                <NetworkGraphList />
              )
            }

            {
              sidebarView === SIDEBAR_VIEW_GRAPH_OPTIONS && (
                <NetworkGraphOptions />
              )
            }

            {
              sidebarView === SIDEBAR_VIEW_FREE_TEXT_SEARCH && (
                <FreeTextSearch />
              )
            }

            {
              sidebarView === SIDEBAR_VIEW_SYNONYMS && (
                <SynonymsList />
              )
            }

            {
              sidebarView === SIDEBAR_VIEW_STRUCTURED_SEARCH && (
                <StructuredSearch />
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
              sidebarView === SIDEBAR_VIEW_NOTES && (
                <NotesList />
              )
            }

            {
              sidebarView === SIDEBAR_VIEW_EXPORT && (
                <ExportSettings />
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
  updateStoreValue: PropTypes.func.isRequired,
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
