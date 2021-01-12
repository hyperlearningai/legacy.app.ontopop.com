const addNode = ({
  availableNodesNormalised,
  availableNodes,
  addedNodes,
  nodeId,
  nodeIdObject
}) => {
  availableNodesNormalised[nodeId] = nodeIdObject  // eslint-disable-line
  availableNodes.push(nodeIdObject)
  addedNodes.push(nodeId)
}

const serialiseNodesEdges = ({
  nodesIdsToDisplay,
  classesFromApi,
  objectPropertiesFromApi,
  setStoreState,
  // edgesToIgnore,
  // deletedNodes,
}) => {
  const allClassesAvailable = JSON.parse(JSON.stringify(classesFromApi))

  if (!allClassesAvailable) return

  const addedNodes = []
  const availableNodes = []
  const availableEdges = []
  const availableNodesNormalised = {}
  const nodesConnections = {}
  const edgesConnections = {}

  const allNodeIdsKeys = Object.keys(allClassesAvailable)

  for (const nodeIndex in allNodeIdsKeys) {
    const nodeId = allNodeIdsKeys[nodeIndex]

    // if (deletedNodes.includes(nodeId)) continue

    const nodeIdObject = allClassesAvailable[nodeId]

    nodeIdObject.id = nodeId
    nodeIdObject.label = nodeIdObject.rdfsLabel

    // ignore node without labels
    if (
      !nodeIdObject.label
      || !nodeIdObject.label === ''
    ) continue

    const { rdfsSubClassOf } = nodeIdObject

    if (!rdfsSubClassOf || rdfsSubClassOf.length === 0) continue

    rdfsSubClassOf.map((rdfsSubClassOfObject) => {
      const { owlRestriction } = rdfsSubClassOfObject

      if (!owlRestriction) return false

      const edgeId = owlRestriction.objectPropertyRdfAbout
      const edgeObject = objectPropertiesFromApi[edgeId]

      if (!edgeObject) return false

      const edgeLabel = edgeObject.rdfsLabel

      if (!edgeLabel
      // || edgesToIgnore.includes(edgeId)
      ) return false

      const linkedNodeId = owlRestriction.classRdfAbout

      const isNodeIdToDisplay = nodesIdsToDisplay.includes(nodeId)
      const isLinkedNodeIdToDisplay = nodesIdsToDisplay.includes(linkedNodeId)
      const nodesToDisplay = isNodeIdToDisplay || isLinkedNodeIdToDisplay

      if (!nodesToDisplay
      //  || deletedNodes.includes(linkedNodeId)
      ) return false

      const linkedNodeIdObject = allClassesAvailable[linkedNodeId]

      linkedNodeIdObject.id = linkedNodeId
      linkedNodeIdObject.label = linkedNodeIdObject.rdfsLabel

      const edgeUniqueId = `${edgeId}___${nodeId}___${linkedNodeId}`

      const edge = {
        from: nodeId,
        fromLabel: nodeIdObject.label,
        to: linkedNodeId,
        toLabel: linkedNodeIdObject.label,
        label: edgeLabel,
        edgeId,
        id: edgeUniqueId
      }

      if (!availableEdges.includes(edge)) {
        availableEdges.push(edge)

        const edgeConnection = {
          from: nodeId,
          fromLabel: nodeIdObject.label,
          to: linkedNodeId,
          toLabel: linkedNodeIdObject.label,
        }

        if (edgesConnections[edgeId] && !edgesConnections[edgeId].includes(edge)) {
          edgesConnections[edgeId].push(edgeConnection)
        } else {
          edgesConnections[edgeId] = [edgeConnection]
        }

        if (nodesConnections[nodeId] && !nodesConnections[nodeId].includes(edge)) {
          nodesConnections[nodeId].push(edge)
        } else {
          nodesConnections[nodeId] = [edge]
        }

        if (nodesConnections[linkedNodeId] && !nodesConnections[linkedNodeId].includes(edge)) {
          nodesConnections[linkedNodeId].push(edge)
        } else {
          nodesConnections[linkedNodeId] = [edge]
        }
      }

      if (!addedNodes.includes(linkedNodeId)
        && linkedNodeIdObject.label
        && linkedNodeIdObject.label !== ''
      ) {
        addNode({
          availableNodesNormalised,
          availableNodes,
          addedNodes,
          nodeId: linkedNodeId,
          nodeIdObject: linkedNodeIdObject
        })
      }

      // add node
      if (!addedNodes.includes(nodeId)
        && nodeIdObject.label
        && nodeIdObject.label !== ''
      ) {
        addNode({
          availableNodesNormalised,
          availableNodes,
          addedNodes,
          nodeId,
          nodeIdObject
        })
      }

      return true
    })
  }

  // display only nodes with edges
  const availableEdgesUniqueNodesTo = availableEdges.map((edge) => edge.to)
  const availableEdgesUniqueNodesFrom = availableEdges.map((edge) => edge.from)

  const totalNodes = [
    ...availableEdgesUniqueNodesTo,
    ...availableEdgesUniqueNodesFrom
  ]

  const availableNodesWithEdges = availableNodes.filter((node) => totalNodes.includes(node.id))

  console.log({
    availableNodesWithEdges
  })
  setStoreState('availableNodesNormalised', availableNodesNormalised)
  setStoreState('availableNodes', availableNodesWithEdges)
  setStoreState('availableEdges', availableEdges)
  setStoreState('nodesConnections', JSON.parse(JSON.stringify(nodesConnections)))
  setStoreState('edgesConnections', JSON.parse(JSON.stringify(edgesConnections)))
}

export default serialiseNodesEdges
