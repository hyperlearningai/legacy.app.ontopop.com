import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  SiAtom
} from 'react-icons/si'
import {
  FaSitemap
} from 'react-icons/fa'
import {
  IoFootballOutline
} from 'react-icons/io5'
import actions from '../store/actions'
import { SIDEBAR_VIEW_SETTINGS } from '../constants/views'

const NetworkSettings = ({
  setStoreState,
  physicsEdgeLength,
  physicsRepulsion,
  physicsHierarchicalView,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_SETTINGS)}
      </div>
      <div className="network-settings">
        <div className="network-settings-input">
          <label htmlFor="rating">
            {t('edgeLength')}
          </label>
          <div className="network-settings-item-input">
            <input
              type="range"
              min="0"
              max="1000"
              step="1"
              name="rating"
              value={physicsEdgeLength}
              onChange={(e) => {
                const { value } = e.target

                setStoreState('physicsEdgeLength', parseInt(value))
              }}
            />
          </div>
        </div>

        <div className="network-settings-input">
          <div className="label">
            {t('positioning')}
          </div>
          <div className="network-settings-buttons">
            <button
              type="button"
              title={t('hierachicalView')}
              className={physicsHierarchicalView ? 'network-settings-buttons-button-selected' : ''}
              onClick={() => setStoreState('physicsHierarchicalView', true)}
            >
              <FaSitemap />
            </button>
            <button
              type="button"
              title={t('gravitationalView')}
              className={!physicsHierarchicalView ? 'network-settings-buttons-button-selected' : ''}
              onClick={() => setStoreState('physicsHierarchicalView', false)}
            >
              <SiAtom />
            </button>
          </div>
        </div>

        <div className="network-settings-input">
          <div className="label">
            {t('repulsion')}
          </div>
          <div className="network-settings-buttons">
            <button
              type="button"
              title={t('enableRepulsion')}
              className={physicsRepulsion ? 'network-settings-buttons-button-selected' : ''}
              onClick={() => setStoreState('physicsRepulsion', true)}
            >
              <IoFootballOutline />
            </button>
            <button
              type="button"
              title={t('disableRepulsion')}
              className={!physicsRepulsion ? 'network-settings-buttons-button-selected' : ''}
              onClick={() => setStoreState('physicsRepulsion', false)}
            >
              <IoFootballOutline />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

NetworkSettings.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  physicsEdgeLength: PropTypes.number.isRequired,
  physicsHierarchicalView: PropTypes.bool.isRequired,
  physicsRepulsion: PropTypes.bool.isRequired,
}

const mapToProps = ({
  physicsEdgeLength,
  physicsRepulsion,
  physicsHierarchicalView,
}) => ({
  physicsEdgeLength,
  physicsRepulsion,
  physicsHierarchicalView,
})

export default connect(
  mapToProps,
  actions
)(NetworkSettings)
