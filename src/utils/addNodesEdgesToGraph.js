import { generatePredicateId } from '../constants/functions'
import { SUB_CLASS_OF_LABEL } from '../constants/graph'
import store from '../store'

/**
 * Add nodes and/or edges to graph
 * @param  {Object}   params
 * @param  {Number}   params.nodeId           Selected node id
 * @param  {Function} params.setStoreState    setStoreState action
 * @return
 */
const addNodesEdgesToGraph = async ({
  nodeId,
  setStoreState
}) => {
  const {
    availableNodes,
    triplesPerNode,
    classesFromApi,
    objectPropertiesFromApi,
    availableNodesNormalised,
    availableEdges,
    availableEdgesNormalised,
    nodesConnections,
    edgesConnections,
  } = store.getState()

  const triples = triplesPerNode[nodeId]

  const newAvailableEdgesNormalised = JSON.parse(JSON.stringify(availableEdgesNormalised))
  const newAvailableNodesNormalised = JSON.parse(JSON.stringify(availableNodesNormalised))
  const newNodesConnections = JSON.parse(JSON.stringify(nodesConnections))
  const newEdgesConnections = JSON.parse(JSON.stringify(edgesConnections))
  let edgesAdded = false
  let nodesAdded = false

  if (triples?.length > 0) {
    triples.map((triple) => {
      const id = generatePredicateId(triple)

      // check if edge exists
      if (!newAvailableEdgesNormalised[id]) {
        const {
          predicate,
          from,
          to
        } = triple

        const edgeGraphObject = {
          from,
          to,
          id,
          label: objectPropertiesFromApi[predicate]?.rdfsLabel || SUB_CLASS_OF_LABEL,
        }

        const edgeObject = {
          ...edgeGraphObject,
          edgeId: predicate,
          fromLabel: classesFromApi[from].rdfsLabel,
          toLabel: classesFromApi[from].rdfsLabel,
        }

        // check if node exists
        const nodeIdToCheck = from === nodeId ? to : from

        if (!newAvailableNodesNormalised[nodeIdToCheck]) {
          const nodeGraphObject = {
            id: nodeIdToCheck,
            label: classesFromApi[nodeIdToCheck]?.rdfsLabel.replace(/ /g, '\n') || ''
          }

          const isNodePresent = availableNodes.get(nodeIdToCheck)

          if (isNodePresent === null) {
            availableNodes.add(nodeGraphObject)

            newAvailableNodesNormalised[nodeIdToCheck] = {
              ...classesFromApi[nodeIdToCheck],
              ...nodeGraphObject
            }

            if (!newNodesConnections[nodeIdToCheck]) {
              newNodesConnections[nodeIdToCheck] = []
            }

            newNodesConnections[nodeIdToCheck].push(edgeObject)

            nodesAdded = true
          }
        }

        const isEdgePresent = availableEdges.get(id)

        if (isEdgePresent === null) {
          availableEdges.add(edgeGraphObject)

          newAvailableEdgesNormalised[id] = edgeObject

          if (!newEdgesConnections[predicate]) {
            newEdgesConnections[predicate] = []
          }

          newEdgesConnections[predicate].push(edgeObject)

          edgesAdded = true
        }
      }
      return true
    })
  }

  if (edgesAdded) {
    setStoreState('edgesConnections', newEdgesConnections)
    setStoreState('availableEdgesNormalised', newAvailableEdgesNormalised)
  }

  if (nodesAdded) {
    setStoreState('availableNodesNormalised', newAvailableNodesNormalised)
    setStoreState('nodesConnections', newNodesConnections)

    setStoreState('physicsRepulsion', false)
  }
}

export default addNodesEdgesToGraph
