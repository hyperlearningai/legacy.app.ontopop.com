import addNodesEdges from './addNodesEdges'
import countNodes from '../nodesEdgesUtils/countNodes'
import countEdges from '../nodesEdgesUtils/countEdges'
import addNode from '../nodesEdgesUtils/addNode'
import { USER_DEFINED_PROPERTY } from '../../constants/graph'

/**
 * Node queue to avoid browser freezing
 * @param  {Object}   params
 * @param  {Object}   params.classesFromApi               All available nodes
 * @param  {Array}    params.nodesIdsToDisplay            Node IDs to visualisa
 * @param  {Object}   params.objectPropertiesFromApi      All avilable edges
 * @param  {Object}   params.edgesPerNode                 List of edges per node
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
 * @param  {Boolean}  params.currentPhysicsOnState        Is network graph physics on
 * @param  {Class}    params.network                      VisJs network class
 * @return { undefined }
 */
const addElementToGraph = ({
  classesFromApi,
  nodesIdsToDisplay,
  objectPropertiesFromApi,
  edgesPerNode,
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
  currentPhysicsOnState,
  network
}) => {
  const nodeId = nodesIdsToDisplay[i]
  const nodeIdObject = classesFromApi[nodeId.toString()]
  const triples = edgesPerNode[nodeId.toString()]

  const { stylingNodeCaptionProperty } = nodeIdObject[USER_DEFINED_PROPERTY] ? userDefinedNodeStyling : globalNodeStyling

  nodeIdObject.label = nodeIdObject[stylingNodeCaptionProperty]
    ? nodeIdObject[stylingNodeCaptionProperty].replace(/ /g, '\n') : ''

  addNode({
    ...nodeIdObject,
    x: Math.random() * 1500, // for scattering when in physics mode
    y: Math.random() * 1500,
  })

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
        addNodesEdges({
          edge,
          nodesEdges,
        })

        const nodeToAdd = to.toString() === nodeId.toString()
          ? from.toString()
          : to.toString()

        const noteToAddObject = classesFromApi[nodeToAdd]

        const captionProperty = noteToAddObject[USER_DEFINED_PROPERTY] ? userDefinedNodeStyling.stylingNodeCaptionProperty : globalNodeStyling.stylingNodeCaptionProperty

        noteToAddObject.label = noteToAddObject[captionProperty]
          ? noteToAddObject[captionProperty].replace(/ /g, '\n') : ''

        addNode({
          ...noteToAddObject,
          x: Math.random() * 1500, // for scattering when in physics mode
          y: Math.random() * 1500,
        })
      }

      return true
    })
  }

  if (i === nodeIdsLength - 1) {
    setStoreState('availableNodesCount', countNodes())
    setStoreState('availableEdgesCount', countEdges())
    setStoreState('nodesEdges', JSON.parse(JSON.stringify(nodesEdges)))

    // turn physics on to scatter nodes around
    setStoreState('isPhysicsOn', true)

    addNumber('activeLoaders', -1)

    // restore isPhysicsOn state
    setTimeout(() => {
      if (!currentPhysicsOnState) {
        setStoreState('isPhysicsOn', false)
      }

      network?.fit({
        animation: true
      })
    }, 3000)
  }
}

export default addElementToGraph
