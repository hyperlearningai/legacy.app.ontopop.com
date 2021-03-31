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
import { useRouter } from 'next/router'
import { camelCase } from 'lodash'
import actions from '../store/actions'
import {
  IS_SEARCH_VISIBLE,
  IS_GRAPHS_VISIBLE,
  IS_GRAPH_OPTIONS_VISIBLE,
  IS_FREE_TEXT_SEARCH_VISIBLE,
  IS_STRUCTURED_SEARCH_VISIBLE,
  IS_NODE_SELECTION_VISIBLE,
  IS_EDGE_SELECTION_VISIBLE,
  IS_NODES_FILTER_VISIBLE,
  IS_EDGES_FILTER_VISIBLE,
  IS_BOUNDING_BOX_VISIBLE,
  IS_NEIGHBOURHOOD_VISIBLE,
  IS_SHORTEST_PATH_VISIBLE,
  IS_CUSTOM_QUERY_VISIBLE,
  IS_PHYSICS_SETTINGS_VISIBLE,
  IS_STYLING_VISIBLE,
  IS_NOTES_VISIBLE,
  IS_SYNONIMS_VISIBLE,
  IS_EXPORT_VISIBLE,
  IS_EDIT_ONTOLOGY_VISIBLE
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
import {
  ROUTE_BOUNDING_BOX,
  ROUTE_EDGES_FILTER,
  ROUTE_EDGES_SELECTION,
  ROUTE_FREE_TEXT_SEARCH,
  ROUTE_NETWORK_GRAPHS,
  ROUTE_NETWORK_GRAPH_OPTIONS,
  ROUTE_NODES_FILTER,
  ROUTE_NODES_SELECTION,
  ROUTE_NODE_NEIGHBOURHOOD,
  ROUTE_SEARCH,
  ROUTE_SHORTEST_PATH,
  ROUTE_STRUCTURED_SEARCH,
  ROUTE_CUSTOM_QUERY,
  ROUTE_SETTINGS,
  ROUTE_STYLING,
  ROUTE_NOTES,
  ROUTE_SYNONYMS,
  ROUTE_EXPORT,
  ROUTE_EDIT_ONTOLOGY,
} from '../constants/routes'
import { toDashedCase, turnToRoute } from '../constants/functions'

const Sidebar = ({
  isSidebarOpen,
  updateStoreValue,
  currentGraph,
  graphData,
}) => {
  const { t } = useTranslation()

  const router = useRouter()

  const { query } = router
  const { slug } = query

  const slugRoute = slug ? turnToRoute(toDashedCase(slug[0])) : ROUTE_SEARCH

  const sidebarButtons = {
    [ROUTE_SEARCH]: {
      icon: <BsSearch />,
      isVisible: IS_SEARCH_VISIBLE,
      component: <EntrySearch />
    },
    [ROUTE_NETWORK_GRAPHS]: {
      icon: <FiLayers />,
      isVisible: IS_GRAPHS_VISIBLE,
      component: <NetworkGraphList />
    },
    [ROUTE_NETWORK_GRAPH_OPTIONS]: {
      icon: <IoMdOptions />,
      isVisible: IS_GRAPH_OPTIONS_VISIBLE,
      component: <NetworkGraphOptions />
    },
    [ROUTE_FREE_TEXT_SEARCH]: {
      icon: (
        <>
          <BsSearch />
          <BiText />
        </>
      ),
      isVisible: IS_FREE_TEXT_SEARCH_VISIBLE,
      component: <FreeTextSearch />
    },
    [ROUTE_STRUCTURED_SEARCH]: {
      icon: (
        <>
          <BsSearch />
          <IoBuildSharp />
        </>
      ),
      isVisible: IS_STRUCTURED_SEARCH_VISIBLE,
      component: <StructuredSearch />
    },
    [ROUTE_NODES_SELECTION]: {
      icon: (
        <>
          <FaRegCircle />
          <FaRegHandPointer />
        </>
      ),
      isVisible: IS_NODE_SELECTION_VISIBLE,
      component: <NodesSelection />
    },
    [ROUTE_EDGES_SELECTION]: {
      icon: (
        <>
          <BsArrowUpRight />
          <FaRegHandPointer />
        </>
      ),
      isVisible: IS_EDGE_SELECTION_VISIBLE,
      component: <EdgesSelection />
    },
    [ROUTE_NODES_FILTER]: {
      icon: (
        <>
          <FaRegCircle />
          <BsFilter />
        </>
      ),
      isVisible: IS_NODES_FILTER_VISIBLE,
      component: <NodesFilter />
    },
    [ROUTE_EDGES_FILTER]: {
      icon: (
        <>
          <BsArrowUpRight />
          <BsFilter />
        </>
      ),
      isVisible: IS_EDGES_FILTER_VISIBLE,
      component: <EdgesFilter />
    },
    [ROUTE_BOUNDING_BOX]: {
      icon: <BiSelection />,
      isVisible: IS_BOUNDING_BOX_VISIBLE,
      component: <BoundingBoxSelection />
    },
    [ROUTE_NODE_NEIGHBOURHOOD]: {
      icon: <BiNetworkChart />,
      isVisible: IS_NEIGHBOURHOOD_VISIBLE,
      component: <NodeNeighbourhood />
    },
    [ROUTE_SHORTEST_PATH]: {
      icon: <IoGitNetwork />,
      isVisible: IS_SHORTEST_PATH_VISIBLE,
      component: <ShortestPath />
    },
    [ROUTE_CUSTOM_QUERY]: {
      icon: <BsCodeSlash />,
      isVisible: IS_CUSTOM_QUERY_VISIBLE,
      component: <CustomQuery />
    },
    [ROUTE_SETTINGS]: {
      icon: <FiSettings />,
      isVisible: IS_PHYSICS_SETTINGS_VISIBLE,
      component: <NetworkSettings />
    },
    [ROUTE_STYLING]: {
      icon: <FaPaintBrush />,
      isVisible: IS_STYLING_VISIBLE,
      component: <NetworkStyling />
    },
    [ROUTE_NOTES]: {
      icon: <FaStickyNote />,
      isVisible: IS_NOTES_VISIBLE,
      component: <NotesList />
    },
    [ROUTE_SYNONYMS]: {
      icon: <FaFileAlt />,
      isVisible: IS_SYNONIMS_VISIBLE,
      component: <SynonymsList />
    },
    [ROUTE_EXPORT]: {
      icon: <FaFileExport />,
      isVisible: IS_EXPORT_VISIBLE,
      component: <ExportSettings />
    },
    [ROUTE_EDIT_ONTOLOGY]: {
      icon: <BsPencilSquare />,
      isVisible: IS_EDIT_ONTOLOGY_VISIBLE,
      component: <EditOntology />
    }
  }

  return (
    <aside className={`sidebar${isSidebarOpen ? '' : '-closed'}`}>
      <div className="sidebar-icons">
        {
          Object.keys(sidebarButtons).map((route) => {
            const {
              icon, isVisible
            } = sidebarButtons[route]

            if (!isVisible) return false

            const label = camelCase(route.replace('/app/', ''))
            const dashedLabel = toDashedCase(label)

            return (
              <Button
                key={`sidebar-button-${dashedLabel}`}
                id={`sidebar-button-${dashedLabel}`}
                aria-label={t(label)}
                tooltip={t(label)}
                className={slugRoute === route ? 'p-button sidebar-bar-button-selected' : 'p-button'}
                onClick={() => {
                  updateStoreValue(['isSidebarOpen'], OPERATION_TYPE_UPDATE, true)
                  router.push(route)
                }}
              >
                {icon}
              </Button>

            // <Link
            //   key={`sidebar-button-${label}`}
            //   href={route}
            //   aria-label={t(label)}
            //   tooltip={t(label)}
            //   onClick={() => updateStoreValue(['isSidebarOpen'], OPERATION_TYPE_UPDATE, true)}
            // >
            //   <a
            //     id={`sidebar-button-${label}`}
            //     className={pathname === route ? 'p-button sidebar-bar-button-selected' : 'p-button'}
            //   >
            //     {icon}
            //   </a>
            // </Link>
            )
          })
        }
        <Button
          aria-label={t('toggleSidebar')}
          id="sidebar-button-toggle"
          tooltip={t('toggleSidebar')}
          className="toggle-view-button"
          onClick={() => updateStoreValue(['isSidebarOpen'], OPERATION_TYPE_UPDATE, !isSidebarOpen)}
        >
          {
            isSidebarOpen
              ? <AiOutlineArrowLeft />
              : <AiOutlineArrowRight />
          }
        </Button>
      </div>

      {
        isSidebarOpen && (
          <div className="sidebar-main">
            {
              (
                graphData[currentGraph]
                && slugRoute
                && sidebarButtons[slugRoute]
              )
                ? sidebarButtons[slugRoute].component
                : <EntrySearch />
            }
          </div>
        )
      }
    </aside>
  )
}

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  updateStoreValue: PropTypes.func.isRequired,
  currentGraph: PropTypes.string.isRequired,
  graphData: PropTypes.shape().isRequired,
}

const mapToProps = ({
  isSidebarOpen,
  currentGraph,
  graphData
}) => ({
  isSidebarOpen,
  currentGraph,
  graphData
})

export default connect(
  mapToProps,
  actions
)(Sidebar)
