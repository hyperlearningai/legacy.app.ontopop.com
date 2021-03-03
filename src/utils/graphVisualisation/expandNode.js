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
const expandNode = ({
  nodeId,
  setStoreState
}) => {
  const {
    edgesPerNode,
    classesFromApi,
    objectPropertiesFromApi,
    nodesEdges,
    isPhysicsOn,
    globalNodeStyling,
    userDefinedNodeStyling
  } = store.getState()

  const triples = edgesPerNode[nodeId]

  const newNodesEdges = JSON.parse(JSON.stringify(nodesEdges))

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
          from,
          to
        } = edgeObject

        // check if node exists
        const nodeIdToCheck = from === nodeId ? to : from

        const isNodeNotAvailable = getNode(nodeIdToCheck) === null

        if (isNodeNotAvailable) {
          const nodeIdObject = classesFromApi[nodeIdToCheck.toString()]

          const { stylingNodeCaptionProperty } = nodeIdObject.userDefined ? userDefinedNodeStyling : globalNodeStyling

          nodeIdObject.label = nodeIdObject[stylingNodeCaptionProperty]
            ? nodeIdObject[stylingNodeCaptionProperty].replace(/ /g, '\n') : ''

          nodeIdObject.x = Math.floor((Math.random() * 100) + 1)
          nodeIdObject.y = Math.floor((Math.random() * 100) + 1)

          addNode(nodeIdObject)

          if (!newNodesEdges[nodeIdToCheck]) {
            newNodesEdges[nodeIdToCheck] = []
          }

          if (!newNodesEdges[nodeId]) {
            newNodesEdges[nodeId] = []
          }

          newNodesEdges[nodeIdToCheck].push(triple)
          newNodesEdges[nodeId].push(triple)

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

    setStoreState('nodesEdges', newNodesEdges)

    if (!isPhysicsOnNow) {
      setTimeout(() => {
        setStoreState('isPhysicsOn', false)
        setStoreState('physicsRepulsion', false)
      }, 2000)
    }
  }

  setElementsStyle()
}

export default expandNode
