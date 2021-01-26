import React from 'react'
import { connect } from 'redux-zero/react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
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
          {`${t('nodes')}: ${Object.keys(availableNodesNormalised).length} | ${t('edges')}: ${Object.keys(availableEdgesNormalised).length}`}
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
