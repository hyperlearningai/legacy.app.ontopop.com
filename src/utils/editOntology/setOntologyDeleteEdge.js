import store from '../../store'
import removeEdge from '../nodesEdgesUtils/removeEdge'
import getNode from '../nodesEdgesUtils/getNode'
import httpCall from '../apiCalls/httpCall'
import { API_ENDPOINT_GRAPH_EDGES_ID } from '../../constants/api'
import showNotification from '../notifications/showNotification'
import { NOTIFY_SUCCESS, NOTIFY_WARNING } from '../../constants/notifications'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'

/**
 * Remove connection from ontology
 * @param  {Object}         params
 * @param  {Function}       params.updateStoreValue           updateStoreValue action
 * @param  {Object}         params.selectedElement            Array of edge IDs
 * @param  {Function}       params.t                          i18n function
 * @return {undefined}
 */
const setOntologyDeleteEdge = async ({
  updateStoreValue,
  selectedElement,
  t
}) => {
  const {
    classesFromApi,
    deletedEdges,
    totalEdgesPerNode,
    objectPropertiesFromApi
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newDeletedEdges = deletedEdges.slice()
  const newEdgesPerNode = JSON.parse(JSON.stringify(totalEdgesPerNode))

  const edgesDeleted = []

  // delete connections from graph and remove from graph
  if (selectedElement.length > 0) {
    for (let index = 0; index < selectedElement.length; index++) {
      const edgeId = selectedElement[index]

      const response = await httpCall({
        updateStoreValue,
        withAuth: true,
        route: API_ENDPOINT_GRAPH_EDGES_ID.replace('{id}', edgeId),
        method: 'delete',
        body: {},
        t
      })

      const {
        error, data
      } = response

      const message = `${t('couldNotDeleteEdge')}: ${edgeId}`

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

      edgesDeleted.push(edgeId)

      if (!newDeletedEdges.includes(edgeId)) {
        newDeletedEdges.push(edgeId)
      }

      const edge = objectPropertiesFromApi[edgeId]

      const {
        from,
        to
      } = edge

      // delete from triples
      const fromPredicateIndex = newEdgesPerNode[from].indexOf(edgeId)

      if (fromPredicateIndex > -1) {
        newEdgesPerNode[from].splice(fromPredicateIndex, 1)
      }

      const toPredicateIndex = newEdgesPerNode[to].indexOf(edgeId)

      if (toPredicateIndex > -1) {
        newEdgesPerNode[to].splice(toPredicateIndex, 1)
      }

      // check if nodes are visible
      const isFromVisible = getNode(from) === null
      const isToVisible = getNode(to) === null

      if (isFromVisible || isToVisible) return false

      removeEdge(({
        edge,
        updateStoreValue,
      }))
    }
  }

  updateStoreValue(['totalEdgesPerNode'], OPERATION_TYPE_UPDATE, newEdgesPerNode)
  updateStoreValue(['classesFromApi'], OPERATION_TYPE_UPDATE, newClassesFromApi)
  updateStoreValue(['deletedEdges'], OPERATION_TYPE_UPDATE, newDeletedEdges)

  if (edgesDeleted.length > 0) {
    const message = `${t('edgesDeleted')}: ${edgesDeleted.join(', ')}`
    showNotification({
      message,
      type: NOTIFY_SUCCESS
    })
  }
}

export default setOntologyDeleteEdge
