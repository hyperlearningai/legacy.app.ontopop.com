import getEdgeObject from './getEdgeObject'
import showEdgeCheck from './showEdgeCheck'
import addConnections from './addConnections'
import store from '../../store'
import clearNodes from '../nodesEdgesUtils/clearNodes'
import clearEdges from '../nodesEdgesUtils/clearEdges'
import countNodes from '../nodesEdgesUtils/countNodes'
import countEdges from '../nodesEdgesUtils/countEdges'
import setElementsStyle from '../networkStyling/setElementsStyle'
import addNode from '../nodesEdgesUtils/addNode'
import getEdge from '../nodesEdgesUtils/getEdge'
import { EDGE_LABEL_PROPERTY } from '../../constants/graph'

/**
 * Update store and graph based on node IDs to display
 * @param  {Object}   params
 * @param  {Function} params.setStoreState           setStoreState action
 * @return { undefined }
 */
const addElementsToGraph = ({
  setStoreState,
}) => {
  const {
    classesFromApi,
    nodesIdsToDisplay,
    objectPropertiesFromApi,
    triplesPerNode,
    stylingNodeCaptionProperty,
    isPhysicsOn
  } = store.getState()

  const currentPhysicsOnState = isPhysicsOn

  // turn physics off to speed up loading time when restoring large graphsa
  if (currentPhysicsOnState) {
    setStoreState('isPhysicsOn', false)
  }

  // reset nodes/edges (display at the end of the function)
  clearEdges()
  clearNodes()

  const nodesConnections = {}

  if (!nodesIdsToDisplay || nodesIdsToDisplay.length === 0) return false

  for (let i = 0; i < nodesIdsToDisplay.length; i++) {
    const nodeId = nodesIdsToDisplay[i]
    const nodeIdObject = classesFromApi[nodeId.toString()]
    const triples = triplesPerNode[nodeId.toString()]

    if (!nodeIdObject[EDGE_LABEL_PROPERTY]) continue

    nodeIdObject.label = nodeIdObject[stylingNodeCaptionProperty]
      ? nodeIdObject[stylingNodeCaptionProperty].replace(/ /g, '\n') : ''

    addNode({
      ...nodeIdObject,
      x: Math.floor((Math.random() * 100) + 1), // for scattering when in physics mode
      y: Math.floor((Math.random() * 100) + 1),
    })

    if (triples && triples.length > 0) {
      triples.map((triple) => {
        const predicate = triple.toString()

        const edgeObject = objectPropertiesFromApi[predicate]

        if (!edgeObject) return false

        const {
          sourceNodeId,
          targetNodeId
        } = edgeObject

        const edge = getEdgeObject({
          edge: objectPropertiesFromApi[predicate]
        })

        const isEdgeExisting = getEdge(predicate) !== null

        if (isEdgeExisting) return false

        const isEdgeDisplayable = showEdgeCheck({
          edge,
          nodesIdsToDisplay
        })

        if (isEdgeDisplayable) {
          addConnections({
            edge,
            nodesConnections,
          })

          const nodeToAdd = sourceNodeId.toString() === nodeId.toString()
            ? targetNodeId.toString()
            : sourceNodeId.toString()

          const noteToAddObject = classesFromApi[nodeToAdd]

          noteToAddObject.label = noteToAddObject[stylingNodeCaptionProperty]
            ? noteToAddObject[stylingNodeCaptionProperty].replace(/ /g, '\n') : ''

          addNode({
            ...noteToAddObject,
            x: Math.floor((Math.random() * 100) + 1), // for scattering when in physics mode
            y: Math.floor((Math.random() * 100) + 1),
          })
        }

        return true
      })
    }
  }

  setStoreState('availableNodesCount', countNodes())
  setStoreState('availableEdgesCount', countEdges())
  setStoreState('nodesConnections', JSON.parse(JSON.stringify(nodesConnections)))

  // set styles
  setElementsStyle()

  // turn physics on to scatter nodes around
  setStoreState('isPhysicsOn', true)

  // restore isPhysicsOn state
  setTimeout(() => {
    if (!currentPhysicsOnState) {
      setStoreState('isPhysicsOn', false)
    }
  }, 3000)
}

export default addElementsToGraph
