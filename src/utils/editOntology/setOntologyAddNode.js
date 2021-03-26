import showNotification from '../notifications/showNotification'
import { NOTIFY_SUCCESS, NOTIFY_WARNING } from '../../constants/notifications'
import addNode from '../nodesEdgesUtils/addNode'
import { API_ENDPOINT_GRAPH_NODES_CREATE } from '../../constants/api'
import httpCall from '../apiCalls/httpCall'
import checkNodeVisibility from '../networkGraphOptions/checkNodeVisibility'
import { NODE_TYPE } from '../../constants/graph'
import { OPERATION_TYPE_PUSH_UNIQUE, OPERATION_TYPE_UPDATE } from '../../constants/store'

/**
 * ADd ontology nodes
 * @param  {Object}         params
 * @param  {Function}       params.updateStoreValue           updateStoreValue action
 * @param  {Object}         params.selectedElementProperties  Element properties from form
 * @param  {Function}       params.t                          i18n function
 * @return {undefined}
 */
const setOntologyAddNode = async ({
  updateStoreValue,
  selectedElementProperties,
  t
}) => {
  const body = JSON.parse(JSON.stringify(selectedElementProperties))
  body.label = 'class'

  const response = await httpCall({
    updateStoreValue,
    withAuth: true,
    route: API_ENDPOINT_GRAPH_NODES_CREATE,
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

  const {
    id, userDefined, label, userId
  } = data[Object.keys(data)[0]]

  const stringId = id.toString()

  // add to classesFromApi
  const nodeClass = {
    ...selectedElementProperties,
    [NODE_TYPE]: label,
    userDefined,
    id: stringId,
    userId
  }

  updateStoreValue(['classesFromApi', stringId], OPERATION_TYPE_UPDATE, nodeClass)
  updateStoreValue(['classesFromApiBackup', stringId], OPERATION_TYPE_UPDATE, nodeClass)
  updateStoreValue(['nodesEdges', stringId], OPERATION_TYPE_UPDATE, [])
  updateStoreValue(['totalEdgesPerNode', stringId], OPERATION_TYPE_UPDATE, [])
  updateStoreValue(['totalEdgesPerNodeBackup', stringId], OPERATION_TYPE_UPDATE, [])
  updateStoreValue(['addedNodes'], OPERATION_TYPE_PUSH_UNIQUE, stringId)
  updateStoreValue(['nodesSpiderability', stringId], OPERATION_TYPE_UPDATE, 'false')

  const isVisible = checkNodeVisibility({
    nodeId: stringId,
  })

  if (isVisible) {
    addNode({
      node: nodeClass,
      updateStoreValue
    })
  }

  message = `${t('nodeAdded')}: ${stringId}`

  showNotification({
    message,
    type: NOTIFY_SUCCESS
  })
}

export default setOntologyAddNode
