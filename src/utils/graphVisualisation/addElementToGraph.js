import addNodesEdges from './addNodesEdges'
import addNode from '../nodesEdgesUtils/addNode'
import { USER_DEFINED_PROPERTY } from '../../constants/graph'
import setNodeStyle from '../networkStyling/setNodeStyle'
import actionAfterNodesAdded from './actionAfterNodesAdded'
import addEdge from '../nodesEdgesUtils/addEdge'

/**
 * Node queue to avoid browser freezing
 * @param  {Object}   params
 * @param  {Object}   params.classesFromApi               All available nodes
 * @param  {Array}    params.nodesIdsToDisplay            Node IDs to visualisa
 * @param  {Object}   params.objectPropertiesFromApi      All avilable edges
 * @param  {Object}   params.totalEdgesPerNode                 List of edges per node
 * @param  {Object}   params.globalNodeStyling            Styling properties for nodes (global)
 * @param  {Object}   params.userDefinedNodeStyling       Styling properties for nodes (user-defined)
 * @param  {Object}   params.globalEdgeStyling            Styling properties for edges (global)
 * @param  {Object}   params.userDefinedEdgeStyling       Styling properties for edges (user-defined)
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
  globalNodeStyling,
  userDefinedNodeStyling,
  globalEdgeStyling,
  userDefinedEdgeStyling,
  setStoreState,
  addNumber,
  i,
  nodeIdsLength,
  processedEdges,
  nodesEdges,
}) => {
  const nodeId = nodesIdsToDisplay[i]
  const nodeIdObject = classesFromApi[nodeId.toString()]
  const triples = totalEdgesPerNode[nodeId.toString()]

  const { stylingNodeCaptionProperty } = nodeIdObject[USER_DEFINED_PROPERTY] ? userDefinedNodeStyling : globalNodeStyling

  nodeIdObject.label = nodeIdObject[stylingNodeCaptionProperty]
    ? nodeIdObject[stylingNodeCaptionProperty].replace(/ /g, '\n') : ''

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
        userDefined
      } = edge

      if (!from || !to) return false

      const { stylingEdgeCaptionProperty } = userDefined ? userDefinedEdgeStyling : globalEdgeStyling

      edge.label = edge[stylingEdgeCaptionProperty]

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

        const captionProperty = nodeToAddObject[USER_DEFINED_PROPERTY] ? userDefinedNodeStyling.stylingNodeCaptionProperty : globalNodeStyling.stylingNodeCaptionProperty

        nodeToAddObject.label = nodeToAddObject[captionProperty]
          ? nodeToAddObject[captionProperty].replace(/ /g, '\n') : ''

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
