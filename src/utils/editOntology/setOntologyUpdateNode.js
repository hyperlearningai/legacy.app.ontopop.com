import store from '../../store'
import updateNodes from '../nodesEdgesUtils/updateNodes'
import { API_ENDPOINT_GRAPH_NODES_ID } from '../../constants/api'
import showNotification from '../notifications/showNotification'
import { NOTIFY_SUCCESS, NOTIFY_WARNING } from '../../constants/notifications'
import httpCall from '../apiCalls/httpCall'
import { NODE_TYPE } from '../../constants/graph'

/**
 * Update ontology nodes
 * @param  {Object}         params
 * @param  {Function}       params.addNumber                  addNumber action
 * @param  {String|Array}   params.selectedElement            Selected node ID
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Object}         params.selectedElementProperties  Element properties from form
 * @param  {Function}       params.t                          i18n function
 * @return {undefined}
 */
const setOntologyUpdateNode = async ({
  addNumber,
  selectedElement,
  setStoreState,
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
    addNumber,
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

  updateNodes({ id: selectedElement, ...newClassesFromApi[selectedElement] })

  const newUpdatedNodes = [
    ...updatedNodes,
    ...[selectedElement]
  ]

  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('updatedNodes', newUpdatedNodes)

  message = `${t('nodeUpdated')}: ${selectedElement}`
  showNotification({
    message,
    type: NOTIFY_SUCCESS
  })
}

export default setOntologyUpdateNode
