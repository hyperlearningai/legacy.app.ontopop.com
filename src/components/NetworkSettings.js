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
  AiOutlinePoweroff
} from 'react-icons/ai'
import {
  IoFootballOutline,
  IoGitNetworkSharp
} from 'react-icons/io5'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import { SIDEBAR_VIEW_SETTINGS } from '../constants/views'
import { OPERATION_TYPE_UPDATE } from '../constants/store'

const NetworkSettings = ({
  updateStoreValue,
  physicsRepulsion,
  physicsHierarchicalView,
  isPhysicsOn
}) => {
  const { t } = useTranslation()

  return (
    <>
      <h1 className="sidebar-main-title">
        {t(SIDEBAR_VIEW_SETTINGS)}
      </h1>
      <div className="network-settings">
        <div className="network-settings-input">
          <div className="label">
            {t('physics')}
          </div>
          <div className="network-settings-buttons">
            <Button
              aria-label={t(isPhysicsOn ? 'physicsOff' : 'physicsOn')}
              tooltip={t(isPhysicsOn ? 'physicsOff' : 'physicsOn')}
              tooltipOptions={{ position: 'top' }}
              className={isPhysicsOn ? 'network-settings-buttons-button-selected' : ''}
              onClick={() => updateStoreValue(['isPhysicsOn'], OPERATION_TYPE_UPDATE, !isPhysicsOn)}
            >
              <AiOutlinePoweroff />
            </Button>
          </div>
        </div>

        <div className="network-settings-input">
          <div className="label">
            {t('positioning')}
          </div>
          <div className="network-settings-buttons">
            <Button
              aria-label={t('hierachicalView')}
              tooltip={t('hierachicalView')}
              tooltipOptions={{ position: 'top' }}
              className={physicsHierarchicalView ? 'network-settings-buttons-button-selected' : ''}
              onClick={() => updateStoreValue(['physicsHierarchicalView'], OPERATION_TYPE_UPDATE, true)}
            >
              <FaSitemap />
            </Button>
            <Button
              aria-label={t('gravitationalView')}
              tooltip={t('gravitationalView')}
              tooltipOptions={{ position: 'top' }}
              className={!physicsHierarchicalView ? 'network-settings-buttons-button-selected' : ''}
              onClick={() => updateStoreValue(['physicsHierarchicalView'], OPERATION_TYPE_UPDATE, false)}
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
              aria-label={t('gravitationalView')}
              tooltip={t('enableRepulsion')}
              tooltipOptions={{ position: 'top' }}
              className={physicsRepulsion ? 'network-settings-buttons-button-selected' : ''}
              onClick={() => updateStoreValue(['physicsRepulsion'], OPERATION_TYPE_UPDATE, true)}
            >
              <IoFootballOutline />
            </Button>
            <Button
              aria-label={t('disableRepulsion')}
              tooltip={t('disableRepulsion')}
              tooltipOptions={{ position: 'top' }}
              className={!physicsRepulsion ? 'network-settings-buttons-button-selected' : ''}
              onClick={() => updateStoreValue(['physicsRepulsion'], OPERATION_TYPE_UPDATE, false)}
            >
              <IoGitNetworkSharp />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

NetworkSettings.propTypes = {
  updateStoreValue: PropTypes.func.isRequired,
  physicsHierarchicalView: PropTypes.bool.isRequired,
  isPhysicsOn: PropTypes.bool.isRequired,
  physicsRepulsion: PropTypes.bool.isRequired,
}

const mapToProps = ({
  stylingEdgeLength,
  physicsRepulsion,
  physicsHierarchicalView,
  isPhysicsOn
}) => ({
  stylingEdgeLength,
  physicsRepulsion,
  physicsHierarchicalView,
  isPhysicsOn
})

export default connect(
  mapToProps,
  actions
)(NetworkSettings)
