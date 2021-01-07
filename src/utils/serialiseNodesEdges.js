const serialiseNodesEdges = ({
  nodesIdsToDisplay,
  classesFromApi,
  objectPropertiesFromApi,
  setStoreState,
  edgesToIgnore
}) => {
  const { OwlClasses } = JSON.parse(JSON.stringify(classesFromApi))

  if (!OwlClasses) return

  const addedNodes = []
  const availableNodes = []
  const availableEdges = []
  const availableNodesNormalised = {}

  for (const nodeIndex in nodesIdsToDisplay) {
    const nodeId = nodesIdsToDisplay[nodeIndex]
    const nodeIdObject = OwlClasses[nodeId]

    nodeIdObject.id = nodeId
    nodeIdObject.label = nodeIdObject.rdfsLabel

    const { rdfsSubClassOf } = nodeIdObject
    delete nodeIdObject.rdfsSubClassOf

    if (rdfsSubClassOf.length > 0) {
      rdfsSubClassOf.map((rdfsSubClassOfObject) => {
        const { owlRestriction } = rdfsSubClassOfObject

        if (owlRestriction) {
          const edgeId = owlRestriction.objectPropertyRdfAbout
          const edgeObject = objectPropertiesFromApi.OwlObjectProperties[edgeId]

          if (edgeObject) {
            const edgeLabel = edgeObject.rdfsLabel

            if (edgeLabel && !edgesToIgnore.includes(edgeId)) {
              const linkedNodeId = owlRestriction.classRdfAbout

              availableEdges.push({
                from: nodeId,
                to: linkedNodeId,
                label: edgeLabel
              })

              if (!addedNodes.includes(linkedNodeId)) {
                const linkedNodeIdObject = OwlClasses[linkedNodeId]

                linkedNodeIdObject.id = linkedNodeId
                linkedNodeIdObject.label = linkedNodeIdObject.rdfsLabel

                if (linkedNodeIdObject.label && linkedNodeIdObject.label !== '') {
                  availableNodesNormalised[linkedNodeId] = linkedNodeIdObject
                  availableNodes.push(linkedNodeIdObject)
                  addedNodes.push(linkedNodeId)
                }
              }
            }
          }
        }

        return true
      })
    }

    if (!addedNodes.includes(nodeId) && nodeIdObject.label && nodeIdObject.label !== '') {
      availableNodesNormalised[nodeId] = nodeIdObject
      availableNodes.push(nodeIdObject)
      addedNodes.push(nodeId)
    }
  }

  setStoreState('availableNodesNormalised', availableNodesNormalised)
  setStoreState('availableNodes', availableNodes)
  setStoreState('availableEdges', availableEdges)
}

export default serialiseNodesEdges
