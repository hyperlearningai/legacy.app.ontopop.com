import React from 'react'
import { connect } from 'redux-zero/react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import {
  BsSearch,
  BsFillCircleFill,
  BsArrowUpRight
} from 'react-icons/bs'
import actions from '../store/actions'

const Navbar = ({
  availableNodesNormalised,
  availableEdgesNormalised
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
    </nav>
  )
}

Navbar.propTypes = {
  availableNodesNormalised: PropTypes.shape().isRequired,
  availableEdgesNormalised: PropTypes.shape().isRequired,
}

const mapToProps = ({
  availableNodesNormalised,
  availableEdgesNormalised
}) => ({
  availableNodesNormalised,
  availableEdgesNormalised
})

export default connect(
  mapToProps,
  actions
)(Navbar)
