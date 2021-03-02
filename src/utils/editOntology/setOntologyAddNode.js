import store from '../../store'
import showNotification from '../notifications/showNotification'
import { NOTIFY_SUCCESS, NOTIFY_WARNING } from '../../constants/notifications'
import addNode from '../nodesEdgesUtils/addNode'
import setNodeStyle from '../networkStyling/setNodeStyle'
import { POST_CREATE_NODE } from '../../constants/api'
import httpCall from '../apiCalls/httpCall'

/**
 * ADd ontology nodes
 * @param  {Object}         params
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Object}         params.selectedElementProperties  Element properties from form
 * @param  {Function}       params.t                          i18n function
 * @return {undefined}
 */
const setOntologyAddNode = async ({
  setStoreState,
  selectedElementProperties,
  t
}) => {
  const {
    nodesEdges,
    classesFromApi,
    classesFromApiBackup,
    addedNodes,
    stylingNodeCaptionProperty,
    edgesPerNode,
    edgesPerNodeBackup,
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newClassesFromApiBackup = JSON.parse(JSON.stringify(classesFromApiBackup))
  const newNodesEdges = JSON.parse(JSON.stringify(nodesEdges))
  const newEdgesPerNode = JSON.parse(JSON.stringify(edgesPerNode))
  const newEdgesPerNodeBackup = JSON.parse(JSON.stringify(edgesPerNodeBackup))

  const body = JSON.parse(JSON.stringify(selectedElementProperties))
  body.label = 'class'

  const response = await httpCall({
    setStoreState,
    withAuth: true,
    route: POST_CREATE_NODE,
    method: 'post',
    body,
    t
  })

  const {
    error, data
  } = response

  let message = t('couldNotAddNode')
  if (error) {
    return showNotification({
      message,
      type: NOTIFY_WARNING
    })
  }

  if (!data || Object.keys(data).length !== 1) {
    return showNotification({
      message,
      type: NOTIFY_WARNING
    })
  }

  const { id, userDefined } = data[Object.keys(data)[0]]

  // add to classesFromApi
  newClassesFromApi[id] = {
    ...selectedElementProperties,
    userDefined,
    id
  }

  // add label
  newClassesFromApi[id].label = selectedElementProperties[stylingNodeCaptionProperty]
    ? selectedElementProperties[stylingNodeCaptionProperty].split(' ').join(' ') : ''

  // add array for new node in nodes edges connections
  newNodesEdges[id] = []
  newEdgesPerNode[id] = []
  newEdgesPerNodeBackup[id] = []

  // add as backup
  newClassesFromApiBackup[id] = newClassesFromApi[id]

  addNode({
    ...newClassesFromApi[id],
  })

  const newAddedNodes = [
    ...addedNodes,
    ...[id]
  ]

  setStoreState('nodesEdges', newNodesEdges)
  setStoreState('edgesPerNode', newEdgesPerNode)
  setStoreState('edgesPerNodeBackup', newEdgesPerNodeBackup)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('classesFromApiBackup', newClassesFromApiBackup)
  setStoreState('addedNodes', newAddedNodes)
  setNodeStyle({
    nodeId: id,
  })

  message = `${t('nodeAdded')}: ${id}`

  showNotification({
    message,
    type: NOTIFY_SUCCESS
  })
}

export default setOntologyAddNode
