import getEdgeObject from './getEdgeObject'
import showEdgeCheck from './showEdgeCheck'
import addNodesEdges from './addNodesEdges'
import store from '../../store'
import clearNodes from '../nodesEdgesUtils/clearNodes'
import clearEdges from '../nodesEdgesUtils/clearEdges'
import countNodes from '../nodesEdgesUtils/countNodes'
import countEdges from '../nodesEdgesUtils/countEdges'
import setElementsStyle from '../networkStyling/setElementsStyle'
import addNode from '../nodesEdgesUtils/addNode'

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
    edgesPerNode,
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

  const nodesEdges = {}

  const processedEdges = []

  if (!nodesIdsToDisplay || nodesIdsToDisplay.length === 0) return false

  for (let i = 0; i < nodesIdsToDisplay.length; i++) {
    const nodeId = nodesIdsToDisplay[i]
    const nodeIdObject = classesFromApi[nodeId.toString()]
    const triples = edgesPerNode[nodeId.toString()]

    nodeIdObject.label = nodeIdObject[stylingNodeCaptionProperty]
      ? nodeIdObject[stylingNodeCaptionProperty].replace(/ /g, '\n') : ''

    addNode({
      ...nodeIdObject,
      x: Math.floor((Math.random() * 100) + 1), // for scattering when in physics mode
      y: Math.floor((Math.random() * 100) + 1),
    })

    if (triples && triples.length > 0) {
      triples.map((edgeId) => {
        const {
          from,
          to
        } = objectPropertiesFromApi[edgeId]

        if (!from || !to) return false

        const edge = getEdgeObject({
          edge: objectPropertiesFromApi[edgeId]
        })

        const isEdgeExisting = processedEdges.includes(edgeId)

        if (isEdgeExisting) return false

        processedEdges.push(edgeId)

        const isEdgeDisplayable = showEdgeCheck({
          edge,
          nodesIdsToDisplay
        })

        if (isEdgeDisplayable) {
          addNodesEdges({
            edge,
            nodesEdges,
          })

          const nodeToAdd = to.toString() === nodeId.toString()
            ? from.toString()
            : to.toString()

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
  setStoreState('nodesEdges', JSON.parse(JSON.stringify(nodesEdges)))

  // set styles
  setElementsStyle()

  // turn physics on to scatter nodes around
  setStoreState('isPhysicsOn', true)

  // restore isPhysicsOn state
  setTimeout(() => {
    if (!currentPhysicsOnState) {
      setStoreState('isPhysicsOn', false)
    }
  }, 5000)
}

export default addElementsToGraph
