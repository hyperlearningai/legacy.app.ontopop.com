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
import { Slider } from 'primereact/slider'
import { Button } from 'primereact/button'
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
            <Slider
              min={0}
              max={1000}
              step={1}
              id="rating"
              value={physicsEdgeLength}
              onChange={(e) => setStoreState('physicsEdgeLength', parseInt(e.value))}
            />
          </div>
        </div>

        <div className="network-settings-input">
          <div className="label">
            {t('positioning')}
          </div>
          <div className="network-settings-buttons">
            <Button
              tooltip={t('hierachicalView')}
              tooltipOptions={{ position: 'top' }}
              className={physicsHierarchicalView ? 'network-settings-buttons-button-selected' : ''}
              onClick={() => setStoreState('physicsHierarchicalView', true)}
            >
              <FaSitemap />
            </Button>
            <Button
              tooltip={t('gravitationalView')}
              tooltipOptions={{ position: 'top' }}
              className={!physicsHierarchicalView ? 'network-settings-buttons-button-selected' : ''}
              onClick={() => setStoreState('physicsHierarchicalView', false)}
            >
              <SiAtom />
            </Button>
          </div>
        </div>

        <div className="network-settings-input">
          <div className="label">
            {t('repulsion')}
          </div>
          <div className="network-settings-buttons">
            <Button
              tooltip={t('enableRepulsion')}
              tooltipOptions={{ position: 'top' }}
              className={physicsRepulsion ? 'network-settings-buttons-button-selected' : ''}
              onClick={() => setStoreState('physicsRepulsion', true)}
            >
              <IoFootballOutline />
            </Button>
            <Button
              tooltip={t('disableRepulsion')}
              tooltipOptions={{ position: 'top' }}
              className={!physicsRepulsion ? 'network-settings-buttons-button-selected' : ''}
              onClick={() => setStoreState('physicsRepulsion', false)}
            >
              <IoFootballOutline />
            </Button>
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
