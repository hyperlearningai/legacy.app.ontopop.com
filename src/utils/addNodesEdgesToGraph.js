import { generatePredicateId } from '../constants/functions'
import { NODE_BORDER, NODE_BORDER_WIDTH, SUB_CLASS_OF_LABEL } from '../constants/graph'
import store from '../store'
import highlightSpiderableNodes from './highlightSpiderableNodes'
import addEdge from './nodesEdgesUtils/addEdge'
import addNode from './nodesEdgesUtils/addNode'
import getNode from './nodesEdgesUtils/getNode'
import updateNodes from './nodesEdgesUtils/updateNodes'
import getEdge from './nodesEdgesUtils/getEdge'

/**
 * Add nodes and/or edges to graph
 * @param  {Object}   params
 * @param  {Number}   params.nodeId           Selected node id
 * @param  {Function} params.setStoreState    setStoreState action
 * @return {undefined}
 */
const addNodesEdgesToGraph = ({
  nodeId,
  setStoreState
}) => {
  const {
    triplesPerNode,
    classesFromApi,
    objectPropertiesFromApi,
    nodesConnections,
    edgesConnections,
    isPhysicsOn
  } = store.getState()

  const triples = triplesPerNode[nodeId]

  const newNodesConnections = JSON.parse(JSON.stringify(nodesConnections))
  const newEdgesConnections = JSON.parse(JSON.stringify(edgesConnections))
  let edgesAdded = false
  let nodesAdded = false

  if (triples?.length > 0) {
    triples.map((triple) => {
      const id = generatePredicateId(triple)

      const edgeObjectId = getEdge(id)

      // check if edge exists
      if (edgeObjectId === null) {
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

        const isNodeNotAvailable = getNode(nodeIdToCheck) === null

        if (isNodeNotAvailable) {
          const nodeGraphObject = {
            id: nodeIdToCheck,
            label: classesFromApi[nodeIdToCheck]?.rdfsLabel.replace(/ /g, '\n') || ''
          }

          addNode(nodeGraphObject)

          if (!newNodesConnections[nodeIdToCheck]) {
            newNodesConnections[nodeIdToCheck] = []
          }

          newNodesConnections[nodeIdToCheck].push(edgeObject)

          nodesAdded = true
        }

        const isEdgePresent = getEdge(id)

        if (isEdgePresent === null) {
          addEdge(edgeGraphObject)

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
  }

  if (nodesAdded) {
    const isPhysicsOnNow = isPhysicsOn
    if (!isPhysicsOnNow) {
      setStoreState('isPhysicsOn', true)
      setStoreState('physicsRepulsion', false)
    }

    setStoreState('nodesConnections', newNodesConnections)

    highlightSpiderableNodes({
      nodesConnections,
      triplesPerNode,
    })

    if (!isPhysicsOnNow) {
      setTimeout(() => {
        setStoreState('isPhysicsOn', false)
        setStoreState('physicsRepulsion', false)
      }, 4000)
    }
  }

  const nodeProperties = getNode(nodeId)

  if (nodeProperties !== null) {
    const { color } = nodeProperties
    const newColor = color ? JSON.parse(JSON.stringify(color)) : {}
    newColor.border = NODE_BORDER
    newColor.borderWidth = NODE_BORDER_WIDTH

    updateNodes({
      id: nodeId,
      color: newColor
    })
  }
}

export default addNodesEdgesToGraph
