import React from 'react'
import { connect } from 'redux-zero/react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import {
  SiAtom,
} from 'react-icons/si'
import {
  FaRegHandPointer
} from 'react-icons/fa'
import actions from '../store/actions'

const FooterComponent = ({
  setStoreState,
  isSettingsOpen,
  availableEdges,
  isEdgeSelectable
}) => {
  const { t } = useTranslation()

  return (
    <footer>
      <div className="footer-left">
        <button
          type="button"
          title={t(isEdgeSelectable ? 'disallowEdgeSelection' : 'allowEdgeSelection')}
          className={isEdgeSelectable ? 'footer-left-button-selected' : ''}
          onClick={() => {
            if (isEdgeSelectable) setStoreState('selectedEdges', [])

            setStoreState('isEdgeSelectable', !isEdgeSelectable)
          }}
        >
          <FaRegHandPointer />
        </button>

        <span>
          {`${t('edges')}: ${availableEdges.length}`}
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
  isEdgeSelectable: PropTypes.bool.isRequired,
  availableEdges: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

const mapToProps = ({
  isSettingsOpen,
  availableEdges,
  isEdgeSelectable,
}) => ({
  isSettingsOpen,
  availableEdges,
  isEdgeSelectable,
})

export default connect(
  mapToProps,
  actions
)(FooterComponent)
