import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  FaSitemap
} from 'react-icons/fa'
import {
  IoFootballOutline
} from 'react-icons/io5'
import actions from '../store/actions'

const SettingsBox = ({
  setStoreState,
  physicsEdgeLength,
  physicsRepulsion,
  physicsHierarchicalView,
}) => {
  const { t } = useTranslation()

  return (
    <div className="physics-settings">
      <div className="physics-settings-title">
        {t('physicsSettings')}
      </div>

      <div className="physics-settings-item">
        <div className="physics-settings-item-label">
          {t('edgeLength')}
        </div>

        <div className="physics-settings-item-input">
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

      <div className="physics-settings-item physics-settings-item-buttons">
        <button
          type="button"
          title={t(physicsHierarchicalView ? 'hideInfo' : 'hierachicalView')}
          className={physicsHierarchicalView ? 'physics-settings-item-buttons-button-selected' : ''}
          onClick={() => setStoreState('physicsHierarchicalView', !physicsHierarchicalView)}
        >
          <FaSitemap />
        </button>

        <button
          type="button"
          title={t(physicsRepulsion ? 'disableRepulsion' : 'enableRepulsion')}
          className={physicsRepulsion ? 'physics-settings-item-buttons-button-selected' : ''}
          onClick={() => setStoreState('physicsRepulsion', !physicsRepulsion)}
        >
          <IoFootballOutline />
        </button>
      </div>
    </div>
  )
}

SettingsBox.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  physicsEdgeLength: PropTypes.number.isRequired,
  physicsRepulsion: PropTypes.bool.isRequired,
  physicsHierarchicalView: PropTypes.bool.isRequired,
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
)(SettingsBox)
