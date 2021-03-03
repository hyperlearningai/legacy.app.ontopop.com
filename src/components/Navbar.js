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
import { MAIN_VIEW_GRAPH, MAIN_VIEW_SEARCH } from '../constants/views'

const Navbar = ({
  availableNodesCount,
  availableEdgesCount,
  mainVisualisation,
  entrySearchResults
}) => {
  const { t } = useTranslation()

  return (
    <nav>
      <div className="nav-left">
        {
          mainVisualisation === MAIN_VIEW_SEARCH && (
            <span>
              <BsSearch className="nodes-icon node m-r-5" />
              {`${t('searchResults')}: ${entrySearchResults.length}`}
            </span>
          )
        }

        {
          mainVisualisation === MAIN_VIEW_GRAPH && (
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
  mainVisualisation: PropTypes.string.isRequired,
  entrySearchResults: PropTypes.arrayOf(PropTypes.shape).isRequired,
}

const mapToProps = ({
  availableNodesCount,
  availableEdgesCount,
  mainVisualisation,
  entrySearchResults
}) => ({
  availableNodesCount,
  availableEdgesCount,
  mainVisualisation,
  entrySearchResults
})

export default connect(
  mapToProps,
  actions
)(Navbar)
