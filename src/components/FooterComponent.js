import React from 'react'
import { connect } from 'redux-zero/react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import {
  SiAtom,
} from 'react-icons/si'
import actions from '../store/actions'

const FooterComponent = ({
  setStoreState,
  isSettingsOpen,
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

      <div className="footer-right">
        <button
          type="button"
          title={t(isSettingsOpen ? 'hidePhysicsSettings' : 'showPhysicsSettings')}
          className={isSettingsOpen ? 'footer-right-button-selected' : ''}
          onClick={() => setStoreState('isSettingsOpen', !isSettingsOpen)}
        >
          <SiAtom />
        </button>
      </div>
    </footer>
  )
}

FooterComponent.propTypes = {
  isSettingsOpen: PropTypes.bool.isRequired,
  setStoreState: PropTypes.func.isRequired,
  availableEdgesNormalised: PropTypes.shape().isRequired,
}

const mapToProps = ({
  isSettingsOpen,
  availableEdgesNormalised,
}) => ({
  isSettingsOpen,
  availableEdgesNormalised,
})

export default connect(
  mapToProps,
  actions
)(FooterComponent)
