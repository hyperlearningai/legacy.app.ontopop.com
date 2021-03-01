import store from '../../store'
import addEdge from '../nodesEdgesUtils/addEdge'
import addNode from '../nodesEdgesUtils/addNode'
import getNode from '../nodesEdgesUtils/getNode'
import getEdgeObject from '../graphVisualisation/getEdgeObject'
import setElementsStyle from '../networkStyling/setElementsStyle'
import httpCall from '../apiCalls/httpCall'
import { POST_CREATE_NODE } from '../../constants/api'
import showNotification from '../notifications/showNotification'
import { NOTIFY_SUCCESS, NOTIFY_WARNING } from '../../constants/notifications'

/**
 * Restore ontology nodes
 * @param  {Object}         params
 * @param  {String|Array}   params.selectedElement            Selected node(s)/edge(s) IDs
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.t                          i18n function
 * @return {undefined}
 */
const setOntologyRestoreNode = async ({
  selectedElement,
  setStoreState,
  t
}) => {
  const {
    classesFromApiBackup,
    classesFromApi,
    deletedNodes,
    deletedEdges,
    objectPropertiesFromApi,
    stylingNodeCaptionProperty,
    objectPropertiesFromApiBackup,
    nodesEdges,
    edgesPerNode,
    edgesPerNodeBackup
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newClassesFromApiBackup = JSON.parse(JSON.stringify(classesFromApiBackup))
  const newObjectPropertiesFromApi = JSON.parse(JSON.stringify(objectPropertiesFromApi))
  const newObjectPropertiesFromApiBackup = JSON.parse(JSON.stringify(objectPropertiesFromApiBackup))
  const newNodesEdges = JSON.parse(JSON.stringify(nodesEdges))
  const newDeletedEdges = deletedEdges.slice()
  const newEdgesPerNode = JSON.parse(JSON.stringify(edgesPerNode))
  const newEdgesPerNodeBackup = JSON.parse(JSON.stringify(edgesPerNodeBackup))

  const selectedElementsAdded = []

  if (selectedElement.length > 0) {
    // first add node back
    for (let index = 0; index < selectedElement.length; index++) {
      const oldId = selectedElement[index]

      const body = newClassesFromApiBackup[oldId] ? JSON.parse(JSON.stringify(newClassesFromApiBackup[oldId])) : undefined

      if (!body) return false

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

      // remove from backup and add new id
      newClassesFromApi[id] = JSON.parse(JSON.stringify(newClassesFromApiBackup[oldId]))
      newClassesFromApiBackup[id] = newClassesFromApi[id]
      delete newClassesFromApiBackup[oldId]

      newClassesFromApi[id].id = id
      newClassesFromApi[id].label = newClassesFromApi[id][stylingNodeCaptionProperty]
        ? newClassesFromApi[id][stylingNodeCaptionProperty].split(' ').join(' ') : ''

      addNode(newClassesFromApi[id])

      // add connection back
      newNodesEdges[id] = []
      newEdgesPerNode[id] = []

      selectedElementsAdded.push({
        id,
        oldId,
      })
    }
  }

  // Remove nodes from deletedNodes
  const newDeletedNodes = deletedNodes.slice().filter((nodeId) => !selectedElement.includes(nodeId))

  if (selectedElementsAdded.length > 0) {
    // then add edges
    selectedElementsAdded.map((node) => {
      const {
        id,
        oldId,
      } = node

      const edges = newEdgesPerNodeBackup[oldId]

      if (edges.length > 0) {
        edges.map((edgeId) => {
          if (newObjectPropertiesFromApiBackup[edgeId].from === oldId) {
            newObjectPropertiesFromApiBackup[edgeId].from = id
          }

          if (newObjectPropertiesFromApiBackup[edgeId].to === oldId) {
            newObjectPropertiesFromApiBackup[edgeId].to = id
          }

          const {
            from,
            to
          } = newObjectPropertiesFromApiBackup[edgeId]

          if (newDeletedNodes.includes(from) || newDeletedNodes.includes(to)) return false

          const edge = getEdgeObject({
            edge: newObjectPropertiesFromApiBackup[edgeId]
          })

          // add edgeId to triple
          if (!newEdgesPerNode[from].includes(edgeId)) {
            newEdgesPerNode[from].push(edgeId)
          }

          if (!newEdgesPerNode[to].includes(edgeId)) {
            newEdgesPerNode[to].push(edgeId)
          }

          const isFromVisible = getNode(from) !== null
          const isToVisible = getNode(to) !== null

          if (isFromVisible && isToVisible) {
            // add to nodes edges
            if (!newNodesEdges[from].includes(edgeId)) {
              newNodesEdges[from].push(edgeId)
            }

            if (!newNodesEdges[to].includes(edgeId)) {
              newNodesEdges[to].push(edgeId)
            }

            const deletedEdgeIndex = newDeletedEdges.indexOf(edgeId)

            if (deletedEdgeIndex > -1) {
              newDeletedEdges.splice(deletedEdgeIndex, 1)
            }

            addEdge(edge)
          }

          return true
        })
      }

      return true
    })

    const message = `${t('nodesRestored')}: ${selectedElementsAdded.join(', ')}`
    showNotification({
      message,
      type: NOTIFY_SUCCESS
    })
  }

  setStoreState('nodesEdges', newNodesEdges)
  setStoreState('edgesPerNode', newEdgesPerNode)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('objectPropertiesFromApi', newObjectPropertiesFromApi)
  setStoreState('deletedNodes', newDeletedNodes)
  setStoreState('deletedEdges', newDeletedEdges)
  setElementsStyle()
}

export default setOntologyRestoreNode
