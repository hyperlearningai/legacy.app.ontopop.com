import store from '../../store'
import updateNodes from '../nodesEdgesUtils/updateNodes'
import { PATCH_UPDATE_NODE } from '../../constants/api'
import showNotification from '../notifications/showNotification'
import { NOTIFY_SUCCESS, NOTIFY_WARNING } from '../../constants/notifications'
import httpCall from '../apiCalls/httpCall'

/**
 * Update ontology nodes
 * @param  {Object}         params
 * @param  {String|Array}   params.selectedElement            Selected node ID
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.addToObject                Add to object action
 * @param  {Object}         params.selectedElementProperties  Element properties from form
 * @param  {Function}       params.t                          i18n function
 * @return {undefined}
 */
const setOntologyUpdateNode = async ({
  selectedElement,
  setStoreState,
  selectedElementProperties,
  t
}) => {
  const {
    classesFromApi,
    updatedNodes,
    stylingNodeCaptionProperty
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))

  const body = JSON.parse(JSON.stringify(selectedElementProperties))

  const response = await httpCall({
    setStoreState,
    withAuth: true,
    route: PATCH_UPDATE_NODE.replace('{id}', selectedElement),
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

  newClassesFromApi[selectedElement].label = selectedElementProperties[stylingNodeCaptionProperty]
    ? selectedElementProperties[stylingNodeCaptionProperty].split(' ').join(' ') : ''

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
