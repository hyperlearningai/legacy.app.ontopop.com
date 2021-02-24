import store from '../../store'
import addEdge from '../nodesEdgesUtils/addEdge'
import getNode from '../nodesEdgesUtils/getNode'
import setEdgeStylesByProperty from '../networkStyling/setEdgeStylesByProperty'
/**
 * ADd ontology edge
 * @param  {Object}         params
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Object}         params.selectedElementProperties  Element properties with from,to,predicate keys
 * @return {undefined}
 */
const setOntologyRestoreConnection = ({
  setStoreState,
  selectedElement,
}) => {
  const {
    objectPropertiesFromApi,
    deletedConnections,
    nodesConnections,
    triplesPerNode,
    objectPropertiesFromApiBackup,
    stylingEdgeCaptionProperty
  } = store.getState()

  const newObjectPropertiesFromApi = JSON.parse(JSON.stringify(objectPropertiesFromApi))
  const newObjectPropertiesFromApiBackup = JSON.parse(JSON.stringify(objectPropertiesFromApiBackup))

  const newNodesConnections = JSON.parse(JSON.stringify(nodesConnections))
  const newTriplesPerNode = JSON.parse(JSON.stringify(triplesPerNode))

  // remove selected elements from deleted connection
  const newDeletedConnections = deletedConnections.filter((connection) => !selectedElement.includes(connection))
  setStoreState('deletedConnections', newDeletedConnections)

  // restore connections from graph
  if (selectedElement.length > 0) {
    selectedElement.map((element) => {
      // add to object properties
      const predicate = element
      newObjectPropertiesFromApi[predicate] = newObjectPropertiesFromApiBackup[predicate]

      const {
        sourceNodeId,
        targetNodeId
      } = newObjectPropertiesFromApi[predicate]
      const predicateLabel = newObjectPropertiesFromApi[predicate][stylingEdgeCaptionProperty]

      const from = sourceNodeId.toString()
      const to = targetNodeId.toString()

      const edge = {
        from,
        predicate,
        to,
        edgeId: predicate,
        id: predicate,
        role: predicateLabel,
        label: predicateLabel,
        rdfsLabel: predicateLabel,
        rdfAbout: predicate,
        edgeProperties: {
          id: predicate,
          label: 'subclass',
          objectPropertyRdfAbout: predicate,
          objectPropertyRdfsLabel: predicateLabel,
          edgeId: predicate
        },
        sourceNodeId: from,
        targetNodeId: to,
      }

      if (!newTriplesPerNode[from].includes(predicate)) {
        newTriplesPerNode[from].push(predicate)
      }

      if (!newTriplesPerNode[to].includes(predicate)) {
        newTriplesPerNode[to].push(predicate)
      }

      const isFromVisible = getNode(from) !== null
      const isToVisible = getNode(to) !== null

      if (
        isFromVisible
        && isToVisible) {
        addEdge(edge)

        // add connections
        if (!newNodesConnections[from].includes(predicate)) {
          newNodesConnections[from].push(predicate)
        }

        if (!newNodesConnections[to].includes(predicate)) {
          newNodesConnections[to].push(predicate)
        }

        setEdgeStylesByProperty({
          edgeId: edge.id
        })
      }

      return true
    })
  }

  // add data
  setStoreState('nodesConnections', newNodesConnections)
  setStoreState('triplesPerNode', newTriplesPerNode)
  setStoreState('objectPropertiesFromApi', newObjectPropertiesFromApi)
}

export default setOntologyRestoreConnection
