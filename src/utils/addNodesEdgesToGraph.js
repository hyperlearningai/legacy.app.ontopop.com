import { generatePredicateId } from '../constants/functions'
import { NODE_BORDER, NODE_BORDER_WIDTH, SUB_CLASS_OF_LABEL } from '../constants/graph'
import store from '../store'
import highlightSpiderableNodes from './highlightSpiderableNodes'

/**
 * Add nodes and/or edges to graph
 * @param  {Object}   params
 * @param  {Number}   params.nodeId           Selected node id
 * @param  {Function} params.setStoreState    setStoreState action
 * @return
 */
const addNodesEdgesToGraph = ({
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
    isPhysicsOn
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
    const isPhysicsOnNow = isPhysicsOn
    if (!isPhysicsOnNow) {
      setStoreState('isPhysicsOn', true)
      setStoreState('physicsRepulsion', false)
    }

    setStoreState('availableNodesNormalised', newAvailableNodesNormalised)
    setStoreState('nodesConnections', newNodesConnections)

    highlightSpiderableNodes({
      nodesConnections,
      triplesPerNode,
      availableNodes,
      availableNodesNormalised
    })

    if (!isPhysicsOnNow) {
      setTimeout(() => {
        setStoreState('isPhysicsOn', false)
        setStoreState('physicsRepulsion', false)
      }, 4000)
    }
  }

  const nodeProperties = availableNodes.get(nodeId)
  if (nodeProperties) {
    const { color } = nodeProperties
    const newColor = color ? JSON.parse(JSON.stringify(color)) : {}
    newColor.border = NODE_BORDER
    newColor.borderWidth = NODE_BORDER_WIDTH

    availableNodes.update({
      id: nodeId,
      color: newColor
    })
  }
}

export default addNodesEdgesToGraph
