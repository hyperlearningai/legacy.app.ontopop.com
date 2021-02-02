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
  availableNodesNormalised,
  availableEdgesNormalised,
  selectedGraphVersion
}) => {
  const { t } = useTranslation()

  return (
    <nav>
      <div className="nav-left">
        <span>
          <BsFillCircleFill className="nodes-icon node m-r-5" />
          {`${t('nodes')}: ${Object.keys(availableNodesNormalised).length}`}
          <span className="m-l-5 m-r-5">|</span>
          <BsArrowUpRight className="nodes-icon edge" />
          {`${t('edges')}: ${Object.keys(availableEdgesNormalised).length}`}
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
  availableNodesNormalised: PropTypes.shape().isRequired,
  availableEdgesNormalised: PropTypes.shape().isRequired,
  selectedGraphVersion: PropTypes.string.isRequired,
}

const mapToProps = ({
  availableNodesNormalised,
  availableEdgesNormalised,
  selectedGraphVersion
}) => ({
  availableNodesNormalised,
  availableEdgesNormalised,
  selectedGraphVersion
})

export default connect(
  mapToProps,
  actions
)(Navbar)
