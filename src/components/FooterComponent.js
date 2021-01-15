import React from 'react'
import { connect } from 'redux-zero/react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import actions from '../store/actions'

const FooterComponent = ({
  availableEdgesNormalised,
}) => {
  const { t } = useTranslation()

  return (
    <footer>
      <div className="footer-left">
        <span>
          {`${t('edges')}: ${Object.keys(availableEdgesNormalised).length}`}
        </span>
      </div>
    </footer>
  )
}

FooterComponent.propTypes = {
  availableEdgesNormalised: PropTypes.shape().isRequired,
}

const mapToProps = ({
  availableEdgesNormalised,
}) => ({
  availableEdgesNormalised,
})

export default connect(
  mapToProps,
  actions
)(FooterComponent)
