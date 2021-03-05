import store from '../../store'
import addEdge from '../nodesEdgesUtils/addEdge'
import getNode from '../nodesEdgesUtils/getNode'
import setEdgeStyleByProperty from '../networkStyling/setEdgeStyleByProperty'
import { POST_CREATE_EDGE } from '../../constants/api'
import httpCall from '../apiCalls/httpCall'
import showNotification from '../notifications/showNotification'
import { NOTIFY_SUCCESS, NOTIFY_WARNING } from '../../constants/notifications'
import countNodes from '../nodesEdgesUtils/countNodes'
import countEdges from '../nodesEdgesUtils/countEdges'

/**
 * ADd ontology edge
 * @param  {Object}         params
 * @param  {Function}       params.addNumber                  addNumber action
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Object}         params.selectedElement            Element properties with from,to,edge keys
 * @param  {Function}       params.t                          i18n function
 * @return {undefined}
 */
const setOntologyRestoreEdge = async ({
  addNumber,
  setStoreState,
  selectedElement,
  t
}) => {
  const {
    objectPropertiesFromApi,
    deletedEdges,
    nodesEdges,
    edgesPerNode,
    objectPropertiesFromApiBackup,
    stylingEdgeCaptionProperty
  } = store.getState()

  const newObjectPropertiesFromApi = JSON.parse(JSON.stringify(objectPropertiesFromApi))
  const newObjectPropertiesFromApiBackup = JSON.parse(JSON.stringify(objectPropertiesFromApiBackup))

  const newNodesEdges = JSON.parse(JSON.stringify(nodesEdges))
  const newEdgesPerNode = JSON.parse(JSON.stringify(edgesPerNode))

  const restoredEdges = {}

  // restore connections from graph
  if (selectedElement.length > 0) {
    for (let index = 0; index < selectedElement.length; index++) {
      const oldId = selectedElement[index]

      const body = newObjectPropertiesFromApiBackup[oldId] ? JSON.parse(JSON.stringify(newObjectPropertiesFromApiBackup[oldId])) : undefined

      if (!body) return false

      body.label = 'subclass'

      const response = await httpCall({
        addNumber,
        withAuth: true,
        route: POST_CREATE_EDGE,
        method: 'post',
        body,
        t
      })

      const {
        error, data
      } = response

      const message = `${t('couldNotRestoreNode')}: ${oldId}`
      if (error) {
        showNotification({
          message,
          type: NOTIFY_WARNING
        })
        continue
      }

      if (!data || Object.keys(data).length !== 1) {
        showNotification({
          message,
          type: NOTIFY_WARNING
        })
        continue
      }

      const { id } = data[Object.keys(data)[0]]

      // add to object properties
      newObjectPropertiesFromApi[id] = newObjectPropertiesFromApiBackup[id]

      const {
        from,
        to
      } = newObjectPropertiesFromApi[id]

      const edgeLabel = newObjectPropertiesFromApi[id][stylingEdgeCaptionProperty]

      const edge = {
        ...newObjectPropertiesFromApi[id],
        label: edgeLabel,
      }

      if (!newEdgesPerNode[from].includes(id)) {
        newEdgesPerNode[from].push(id)
      }

      if (!newEdgesPerNode[to].includes(id)) {
        newEdgesPerNode[to].push(id)
      }

      const isFromVisible = getNode(from) !== null
      const isToVisible = getNode(to) !== null

      if (
        isFromVisible
        && isToVisible) {
        addEdge(edge)

        // add connections
        if (!newNodesEdges[from].includes(id)) {
          newNodesEdges[from].push(id)
        }

        if (!newNodesEdges[to].includes(id)) {
          newNodesEdges[to].push(id)
        }

        setEdgeStyleByProperty({
          edgeId: edge.id
        })
      }

      restoredEdges[id] = oldId
    }
  }

  // remove selected elements from deleted connection
  const newDeletedEdges = deletedEdges.filter((connection) => !restoredEdges[connection])
  setStoreState('deletedEdges', newDeletedEdges)

  // add data
  setStoreState('nodesEdges', newNodesEdges)
  setStoreState('edgesPerNode', newEdgesPerNode)
  setStoreState('objectPropertiesFromApi', newObjectPropertiesFromApi)

  const restoredEdgesOldIds = Object.keys(restoredEdges)

  if (restoredEdgesOldIds.length > 0) {
    const restoredEdgesIds = restoredEdgesOldIds.map((edgeId) => restoredEdgesOldIds[edgeId])

    const message = `${t('edgesRestored')}: ${restoredEdgesIds.join(', ')}`
    showNotification({
      message,
      type: NOTIFY_SUCCESS
    })

    setStoreState('availableNodesCount', countNodes())
    setStoreState('availableEdgesCount', countEdges())
  }
}

export default setOntologyRestoreEdge
