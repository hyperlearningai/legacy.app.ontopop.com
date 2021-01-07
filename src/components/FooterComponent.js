import React from 'react';
import { connect } from 'redux-zero/react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import {
  AiOutlineNodeIndex
} from 'react-icons/ai'
import {
  SiAtom,
} from 'react-icons/si'
import actions from '../store/actions'

const FooterComponent = ({
  setStoreState,
  isSettingsOpen,
  isEdgeFilterOpen,
  availableEdges,
}) => {
  const { t } = useTranslation()

  return (
    <footer>
      <div className="footer-left">
        <button
          type="button"
          title={t(isEdgeFilterOpen ? 'hideEdgeFilter' : 'showEdgeFilter')}
          className={isEdgeFilterOpen ? 'footer-left-button-selected' : ''}
          onClick={() => setStoreState('isEdgeFilterOpen', !isEdgeFilterOpen)}
        >
          <AiOutlineNodeIndex />
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
};

FooterComponent.propTypes = {
  isEdgeFilterOpen: PropTypes.bool.isRequired,
  isSettingsOpen: PropTypes.bool.isRequired,
  setStoreState: PropTypes.func.isRequired,
  availableEdges: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

const mapToProps = ({
  isEdgeFilterOpen,
  isSettingsOpen,
  availableEdges,
}) => ({
  isEdgeFilterOpen,
  isSettingsOpen,
  availableEdges,
})

export default connect(
  mapToProps,
  actions
)(FooterComponent)
