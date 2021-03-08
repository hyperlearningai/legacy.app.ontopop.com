import { Menu } from 'primereact/menu'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import actions from '../store/actions'
import expandNode from '../utils/graphVisualisation/expandNode'
import { SIDEBAR_VIEW_CUSTOM_QUERY } from '../constants/views'

const GraphContextMenu = ({
  setStoreState,
  contextMenuData,
  addNumber,
}) => {
  const { t } = useTranslation()

  const {
    top,
    left,
    nodeId
  } = contextMenuData

  const menu = [
    {
      label: t('customQuery'),
      icon: 'pi pi-fw pi-tablet',
      command: () => {
        setStoreState('sidebarView', SIDEBAR_VIEW_CUSTOM_QUERY)
        setStoreState('showContextMenu', false)
      }
    },
    {
      separator: true
    },
    {
      label: t('close'),
      icon: 'pi pi-fw pi-power-off',
      command: () => setStoreState('showContextMenu', false)
    }
  ]

  if (nodeId) {
    menu[1] = {
      label: t('expandNode'),
      icon: 'pi pi-fw pi-plus',
      command: () => {
        expandNode({
          nodeId,
          setStoreState,
          addNumber,
        })
        setStoreState('showContextMenu', false)
      }
    }
  }

  if (nodeId) {
    menu[2] = {
      label: t('addNote'),
      icon: 'pi pi-fw pi-plus',
      command: () => {
        expandNode({
          nodeId,
          setStoreState,
          addNumber,
        })
        setStoreState('showContextMenu', false)
      }
    }
  }

  return (
    <Menu
      className="context-menu"
      style={{ top, left }}
      model={menu}
    />
  )
}

GraphContextMenu.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  addNumber: PropTypes.func.isRequired,
  contextMenuData: PropTypes.shape().isRequired,
}

const mapToProps = ({
  contextMenuData,
}) => ({
  contextMenuData,
})

export default connect(
  mapToProps,
  actions
)(GraphContextMenu)
