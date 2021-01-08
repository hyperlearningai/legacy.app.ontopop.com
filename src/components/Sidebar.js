import React from 'react'
import { connect } from 'redux-zero/react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import {
  GiTronArrow
} from 'react-icons/gi'
import {
  GrNodes
} from 'react-icons/gr'
import {
  AiFillSetting,
} from 'react-icons/ai'
import actions from '../store/actions'
import {
  SIDEBAR_VIEW_NODES,
  SIDEBAR_VIEW_EDGES,
  SIDEBAR_VIEW_SETTINGS
} from '../constants/views'

const Sidebar = ({
  sidebarView,
  setStoreState,
}) => {
  const { t } = useTranslation()

  return (
    <aside>
      <div className="aside-bar">
        <button
          type="button"
          title={t('nodesOptions')}
          className={sidebarView === SIDEBAR_VIEW_NODES ? 'aside-bar-button-selected' : ''}
          onClick={() => setStoreState('sidebarView', SIDEBAR_VIEW_NODES)}
        >
          <GrNodes />
        </button>

        <button
          type="button"
          title={t('edgesOptions')}
          className={sidebarView === SIDEBAR_VIEW_EDGES ? 'aside-bar-button-selected' : ''}
          onClick={() => setStoreState('sidebarView', SIDEBAR_VIEW_EDGES)}
        >
          <GiTronArrow />
        </button>

        <button
          type="button"
          title={t('settings')}
          className={sidebarView === SIDEBAR_VIEW_SETTINGS ? 'aside-bar-button-selected' : ''}
          onClick={() => setStoreState('sidebarView', SIDEBAR_VIEW_SETTINGS)}
        >
          <AiFillSetting />
        </button>
      </div>

      ADD CONTENT
    </aside>
  )
}

Sidebar.propTypes = {
  sidebarView: PropTypes.string.isRequired,
  setStoreState: PropTypes.func.isRequired,
}

const mapToProps = ({
  sidebarView
}) => ({
  sidebarView
})

export default connect(
  mapToProps,
  actions
)(Sidebar)
