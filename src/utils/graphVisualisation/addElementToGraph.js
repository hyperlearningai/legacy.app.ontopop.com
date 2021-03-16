import addNodesEdges from './addNodesEdges'
import addNode from '../nodesEdgesUtils/addNode'
import setNodeStyle from '../networkStyling/setNodeStyle'
import actionAfterNodesAdded from './actionAfterNodesAdded'
import addEdge from '../nodesEdgesUtils/addEdge'
import getElementLabel from '../networkStyling/getElementLabel'

/**
 * Node queue to avoid browser freezing
 * @param  {Object}   params
 * @param  {Object}   params.classesFromApi               All available nodes
 * @param  {Array}    params.nodesIdsToDisplay            Node IDs to visualisa
 * @param  {Object}   params.objectPropertiesFromApi      All avilable edges
 * @param  {Object}   params.totalEdgesPerNode                 List of edges per node
 * @param  {Function} params.setStoreState                setStoreState action
 * @param  {Function} params.addNumber                    addNumber action
 * @param  {Number}   params.i                            Current node index
 * @param  {Number}   params.nodeIdsLength                Total nodes number
 * @param  {Array}    params.processedEdges               Edges already processed
 * @param  {Object}   params.nodesEdges                   Edges per node
 * @return { undefined }
 */
const addElementToGraph = ({
  classesFromApi,
  nodesIdsToDisplay,
  objectPropertiesFromApi,
  totalEdgesPerNode,
  setStoreState,
  addNumber,
  i,
  nodeIdsLength,
  processedEdges,
  nodesEdges,
}) => {
  const nodeId = nodesIdsToDisplay[i]
  const nodeIdObject = classesFromApi[nodeId]
  const triples = totalEdgesPerNode[nodeId]

  // add node
  nodeIdObject.label = getElementLabel({
    type: 'node',
    id: nodeId
  })

  addNode({
    node: {
      ...nodeIdObject,
      x: Math.random() * 1500, // for scattering when in physics mode
      y: Math.random() * 1500,
    },
    addNumber
  })
  setNodeStyle({ node: nodeIdObject, skipSpider: true })
  if (triples && triples.length > 0) {
    triples.map((edgeId) => {
      const edge = objectPropertiesFromApi[edgeId]

      const {
        from,
        to,
      } = edge

      if (!from || !to) return false

      edge.label = getElementLabel({
        type: 'edge',
        id: edgeId
      })

      const isEdgeExisting = processedEdges.includes(edgeId)

      if (isEdgeExisting) return false

      processedEdges.push(edgeId)

      const isEdgeDisplayable = nodesIdsToDisplay.includes(to.toString())
      && nodesIdsToDisplay.includes(from.toString())

      if (isEdgeDisplayable) {
        addEdge({ edge, addNumber })

        addNodesEdges({
          edge,
          nodesEdges,
        })

        const nodeToAdd = to.toString() === nodeId.toString()
          ? from.toString()
          : to.toString()

        const nodeToAddObject = classesFromApi[nodeToAdd]

        nodeToAddObject.label = getElementLabel({
          type: 'node',
          id: nodeToAdd
        })

        addNode({
          node: {
            ...nodeToAddObject,
            x: Math.random() * 1500, // for scattering when in physics mode
            y: Math.random() * 1500,
          },
          addNumber
        })
        setNodeStyle({ node: nodeToAddObject, skipSpider: true })
      }

      return true
    })
  }

  if (i === nodeIdsLength - 1) {
    actionAfterNodesAdded({
      setStoreState,
      addNumber,
      nodesEdges,
    })
  }
}

export default addElementToGraph
