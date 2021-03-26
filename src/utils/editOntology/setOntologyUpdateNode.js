import store from '../../store'
import updateNodes from '../nodesEdgesUtils/updateNodes'
import { API_ENDPOINT_GRAPH_NODES_ID } from '../../constants/api'
import showNotification from '../notifications/showNotification'
import { NOTIFY_SUCCESS, NOTIFY_WARNING } from '../../constants/notifications'
import httpCall from '../apiCalls/httpCall'
import { NODE_TYPE } from '../../constants/graph'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'

/**
 * Update ontology nodes
 * @param  {Object}         params
 * @param  {Function}       params.updateStoreValue                  updateStoreValue action
 * @param  {String|Array}   params.selectedElement            Selected node ID
 * @param  {Object}         params.selectedElementProperties  Element properties from form
 * @param  {Function}       params.t                          i18n function
 * @return {undefined}
 */
const setOntologyUpdateNode = async ({
  updateStoreValue,
  selectedElement,
  selectedElementProperties,
  t
}) => {
  const {
    classesFromApi,
    updatedNodes,
    userDefinedNodeStyling
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))

  const node = newClassesFromApi[selectedElement]

  const body = {
    ...node,
    ...selectedElementProperties,
    label: node[NODE_TYPE]
  }

  delete body[NODE_TYPE]

  const response = await httpCall({
    updateStoreValue,
    withAuth: true,
    route: API_ENDPOINT_GRAPH_NODES_ID.replace('{id}', selectedElement),
    method: 'patch',
    body,
    t
  })

  const {
    error, data
  } = response

  let message = t('couldNotUpdateNode')

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

  newClassesFromApi[selectedElement] = {
    ...newClassesFromApi[selectedElement],
    ...selectedElementProperties
  }

  const { stylingNodeCaptionProperty } = userDefinedNodeStyling

  newClassesFromApi[selectedElement].label = selectedElementProperties[stylingNodeCaptionProperty]
    ? selectedElementProperties[stylingNodeCaptionProperty].replace(/ /g, '\n') : ''
  newClassesFromApi[selectedElement].title = newClassesFromApi[selectedElement].label

  updateNodes({ id: selectedElement, ...newClassesFromApi[selectedElement] })

  const newUpdatedNodes = [
    ...updatedNodes,
    ...[selectedElement]
  ]

  updateStoreValue(['classesFromApi'], OPERATION_TYPE_UPDATE, newClassesFromApi)
  updateStoreValue(['updatedNodes'], OPERATION_TYPE_UPDATE, newUpdatedNodes)

  message = `${t('nodeUpdated')}: ${selectedElement}`
  showNotification({
    message,
    type: NOTIFY_SUCCESS
  })
}

export default setOntologyUpdateNode
