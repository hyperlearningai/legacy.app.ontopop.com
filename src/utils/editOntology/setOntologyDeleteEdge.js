import store from '../../store'
import removeEdge from '../nodesEdgesUtils/removeEdge'
import getNode from '../nodesEdgesUtils/getNode'
import httpCall from '../apiCalls/httpCall'
import { DELETE_EDGE } from '../../constants/api'
import showNotification from '../notifications/showNotification'
import { NOTIFY_SUCCESS, NOTIFY_WARNING } from '../../constants/notifications'
import countEdges from '../nodesEdgesUtils/countEdges'
import countNodes from '../nodesEdgesUtils/countNodes'

/**
 * Remove connection from ontology
 * @param  {Object}         params
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Object}         params.selectedElement            Array of edge IDs
 * @param  {Function}       params.t                          i18n function
 * @return {undefined}
 */
const setOntologyDeleteEdge = async ({
  setStoreState,
  selectedElement,
  t
}) => {
  const {
    classesFromApi,
    deletedEdges,
    nodesEdges,
    edgesPerNode,
    objectPropertiesFromApi
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newDeletedEdges = deletedEdges.slice()
  const newNodesEdges = JSON.parse(JSON.stringify(nodesEdges))
  const newEdgesPerNode = JSON.parse(JSON.stringify(edgesPerNode))

  const edgesDeleted = []

  // delete connections from graph and remove from graph
  if (selectedElement.length > 0) {
    for (let index = 0; index < selectedElement.length; index++) {
      const edgeId = selectedElement[index]

      const response = await httpCall({
        setStoreState,
        withAuth: true,
        route: DELETE_EDGE.replace('{id}', edgeId),
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

      const {
        from,
        to
      } = objectPropertiesFromApi[edgeId]

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

      // delete from connections
      const fromPredicateConnectionIndex = newNodesEdges[from].indexOf(edgeId)

      if (fromPredicateConnectionIndex > -1) {
        newEdgesPerNode[from].splice(fromPredicateConnectionIndex, 1)
      }

      const toPredicateConnectionIndex = newNodesEdges[to].indexOf(edgeId)

      if (toPredicateConnectionIndex > -1) {
        newEdgesPerNode[to].splice(toPredicateConnectionIndex, 1)
      }

      removeEdge(edgeId)
    }
  }

  setStoreState('nodesEdges', newNodesEdges)
  setStoreState('edgesPerNode', newEdgesPerNode)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('deletedEdges', newDeletedEdges)

  if (edgesDeleted.length > 0) {
    const message = `${t('edgesDeleted')}: ${edgesDeleted.join(', ')}`
    showNotification({
      message,
      type: NOTIFY_SUCCESS
    })

    setStoreState('availableNodesCount', countNodes())
    setStoreState('availableEdgesCount', countEdges())
  }
}

export default setOntologyDeleteEdge
