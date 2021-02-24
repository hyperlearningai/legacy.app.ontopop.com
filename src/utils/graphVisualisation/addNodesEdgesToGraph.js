import store from '../../store'
import addEdge from '../nodesEdgesUtils/addEdge'
import addNode from '../nodesEdgesUtils/addNode'
import getNode from '../nodesEdgesUtils/getNode'
import getEdge from '../nodesEdgesUtils/getEdge'
import setElementsStyle from '../networkStyling/setElementsStyle'
import getEdgeObject from './getEdgeObject'
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
    isPhysicsOn,
    stylingNodeCaptionProperty
  } = store.getState()

  const triples = triplesPerNode[nodeId]

  const newNodesConnections = JSON.parse(JSON.stringify(nodesConnections))

  let nodesAdded = false

  if (triples?.length > 0) {
    triples.map((triple) => {
      const edgeCheck = getEdge(triple)

      // check if edge exists
      if (edgeCheck === null) {
        const edgeObject = objectPropertiesFromApi[triple.toString()]

        if (!edgeObject) return false

        const edge = getEdgeObject({
          edge: edgeObject
        })

        const {
          sourceNodeId,
          targetNodeId
        } = edgeObject

        const from = sourceNodeId.toString()
        const to = targetNodeId.toString()

        // check if node exists
        const nodeIdToCheck = from === nodeId ? to : from

        const isNodeNotAvailable = getNode(nodeIdToCheck) === null

        if (isNodeNotAvailable) {
          const nodeIdObject = classesFromApi[nodeIdToCheck.toString()]

          nodeIdObject.label = nodeIdObject[stylingNodeCaptionProperty]
            ? nodeIdObject[stylingNodeCaptionProperty].replace(/ /g, '\n') : ''

          nodeIdObject.x = Math.floor((Math.random() * 100) + 1)
          nodeIdObject.y = Math.floor((Math.random() * 100) + 1)

          addNode(nodeIdObject)

          if (!newNodesConnections[nodeIdToCheck]) {
            newNodesConnections[nodeIdToCheck] = []
          }

          if (!newNodesConnections[nodeId]) {
            newNodesConnections[nodeId] = []
          }

          newNodesConnections[nodeIdToCheck].push(triple)
          newNodesConnections[nodeId].push(triple)

          nodesAdded = true
        }

        addEdge(edge)
      }
      return true
    })
  }

  if (nodesAdded) {
    const isPhysicsOnNow = isPhysicsOn
    if (!isPhysicsOnNow) {
      setStoreState('isPhysicsOn', true)
      setStoreState('physicsRepulsion', false)
    }

    setStoreState('nodesConnections', newNodesConnections)

    if (!isPhysicsOnNow) {
      setTimeout(() => {
        setStoreState('isPhysicsOn', false)
        setStoreState('physicsRepulsion', false)
      }, 2000)
    }
  }

  setElementsStyle()
}

export default addNodesEdgesToGraph
