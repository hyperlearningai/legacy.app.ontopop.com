import React from 'react'
import { connect } from 'redux-zero/react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import {
  BsFillCircleFill,
  BsArrowUpRight
} from 'react-icons/bs'
import {
  FaGitAlt
} from 'react-icons/fa'
import actions from '../store/actions'

const Navbar = ({
  availableNodesCount,
  availableEdgesCount,
  selectedGraphVersion
}) => {
  const { t } = useTranslation()

  return (
    <nav>
      <div className="nav-left">
        <span>
          <BsFillCircleFill className="nodes-icon node m-r-5" />
          {`${t('nodes')}: ${availableNodesCount}`}
          <span className="m-l-5 m-r-5">|</span>
          <BsArrowUpRight className="nodes-icon edge" />
          {`${t('edges')}: ${availableEdgesCount}`}
        </span>
      </div>

      <div className="nav-right">
        <span>
          <FaGitAlt className="nodes-icon m-r-5" />
          {`${t('version')}: ${selectedGraphVersion}`}
        </span>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  availableNodesCount: PropTypes.number.isRequired,
  availableEdgesCount: PropTypes.number.isRequired,
  selectedGraphVersion: PropTypes.string.isRequired,
}

const mapToProps = ({
  availableNodesCount,
  availableEdgesCount,
  selectedGraphVersion
}) => ({
  availableNodesCount,
  availableEdgesCount,
  selectedGraphVersion
})

export default connect(
  mapToProps,
  actions
)(Navbar)
