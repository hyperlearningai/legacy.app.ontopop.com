import store from '../../store'
import addEdge from '../nodesEdgesUtils/addEdge'
import getNode from '../nodesEdgesUtils/getNode'
import setEdgeStylesByProperty from '../networkStyling/setEdgeStylesByProperty'

/**
 * ADd ontology edge
 * @param  {Object}         params
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Object}         params.selectedElement  Element properties with from,to,edge keys
 * @return {undefined}
 */
const setOntologyRestoreEdge = ({
  setStoreState,
  selectedElement,
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

  // remove selected elements from deleted connection
  const newDeletedEdges = deletedEdges.filter((connection) => !selectedElement.includes(connection))
  setStoreState('deletedEdges', newDeletedEdges)

  // restore connections from graph
  if (selectedElement.length > 0) {
    selectedElement.map((element) => {
      // add to object properties
      const id = element
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

        setEdgeStylesByProperty({
          edgeId: edge.id
        })
      }

      return true
    })
  }

  // add data
  setStoreState('nodesEdges', newNodesEdges)
  setStoreState('edgesPerNode', newEdgesPerNode)
  setStoreState('objectPropertiesFromApi', newObjectPropertiesFromApi)
}

export default setOntologyRestoreEdge
