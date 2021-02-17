import { generatePredicateId } from '../../constants/functions'
import {
  SUB_CLASS_OF_LABEL
} from '../../constants/graph'
import store from '../../store'
import addEdge from '../nodesEdgesUtils/addEdge'
import addNode from '../nodesEdgesUtils/addNode'
import getNode from '../nodesEdgesUtils/getNode'
import getEdge from '../nodesEdgesUtils/getEdge'
import setElementsStyle from '../networkStyling/setElementsStyle'
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
    isPhysicsOn,
    stylingNodeCaptionProperty
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
          predicate,
          label: objectPropertiesFromApi[predicate]
            ? objectPropertiesFromApi[predicate][stylingNodeCaptionProperty]
            : SUB_CLASS_OF_LABEL,
        }

        // check if node exists
        const nodeIdToCheck = from === nodeId ? to : from

        const isNodeNotAvailable = getNode(nodeIdToCheck) === null

        if (isNodeNotAvailable) {
          const nodeGraphObject = {
            id: nodeIdToCheck,
            label: classesFromApi[nodeIdToCheck]
              && classesFromApi[nodeIdToCheck][stylingNodeCaptionProperty]
              ? classesFromApi[nodeIdToCheck][stylingNodeCaptionProperty].replace(/ /g, '\n') : ''
          }

          addNode(nodeGraphObject)

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

        const isEdgePresent = getEdge(id)

        if (isEdgePresent === null) {
          addEdge(edgeGraphObject)

          if (!newEdgesConnections[predicate]) {
            newEdgesConnections[predicate] = []
          }

          newEdgesConnections[predicate].push(triple)

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

    if (!isPhysicsOnNow) {
      setTimeout(() => {
        setStoreState('isPhysicsOn', false)
        setStoreState('physicsRepulsion', false)
      }, 4000)
    }
  }

  setElementsStyle()
}

export default addNodesEdgesToGraph
