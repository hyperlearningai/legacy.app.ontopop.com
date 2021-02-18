import React from 'react'
import { connect } from 'redux-zero/react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import {
  BsFillCircleFill,
  BsArrowUpRight
} from 'react-icons/bs'
import actions from '../store/actions'

const Navbar = ({
  availableNodesCount,
  availableEdgesCount,
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
    </nav>
  )
}

Navbar.propTypes = {
  availableNodesCount: PropTypes.number.isRequired,
  availableEdgesCount: PropTypes.number.isRequired,
}

const mapToProps = ({
  availableNodesCount,
  availableEdgesCount,
}) => ({
  availableNodesCount,
  availableEdgesCount,
})

export default connect(
  mapToProps,
  actions
)(Navbar)
