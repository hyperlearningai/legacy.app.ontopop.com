import { Menu } from 'primereact/menu'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import actions from '../store/actions'
import expandNode from '../utils/graphVisualisation/expandNode'
import { SIDEBAR_VIEW_CUSTOM_QUERY, SIDEBAR_VIEW_NOTES, SIDEBAR_VIEW_SYNONYMS } from '../constants/views'

const GraphContextMenu = ({
  setStoreState,
  contextMenuData,
  addNumber,
}) => {
  const { t } = useTranslation()

  const {
    top,
    left,
    nodeId,
    edgeId
  } = contextMenuData

  const defaultMenu = [
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

  let menu = defaultMenu

  if (nodeId) {
    const selectedNodeMenu = [
      {
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
      }, {
        label: t('notes'),
        icon: 'pi pi-fw pi-comment',
        command: () => {
          setStoreState('noteElementId', nodeId)
          setStoreState('selectedNotesType', 'node')
          setStoreState('sidebarView', SIDEBAR_VIEW_NOTES)
          setStoreState('showContextMenu', false)
        }
      },
      {
        label: t('synonyms'),
        icon: 'pi pi-file',
        command: () => {
          setStoreState('synonymElementId', nodeId)
          setStoreState('selectedNotesType', 'node')
          setStoreState('sidebarView', SIDEBAR_VIEW_SYNONYMS)
          setStoreState('showContextMenu', false)
        }
      }
    ]

    menu = [
      defaultMenu[0],
      ...selectedNodeMenu,
      ...defaultMenu.slice(1)
    ]
  } else if (edgeId) {
    const selectedEdgeMenu = [
      {
        label: t('notes'),
        icon: 'pi pi-fw pi-comment',
        command: () => {
          setStoreState('noteElementId', edgeId)
          setStoreState('selectedNotesType', 'edge')
          setStoreState('sidebarView', SIDEBAR_VIEW_NOTES)
          setStoreState('showContextMenu', false)
        }
      }
    ]

    menu = [
      defaultMenu[0],
      ...selectedEdgeMenu,
      ...defaultMenu.slice(1)
    ]
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
