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

const serialiseNodesEdges = async ({
  nodesIdsToDisplay,
  classesFromApi,
  objectPropertiesFromApi,
  setStoreState,
  triplesPerNode
  // edgesToIgnore,
  // deletedNodes,
}) => {
  const addedNodes = []
  const addedEdges = []
  const availableNodes = []
  const availableEdges = []
  const availableNodesNormalised = {}
  const nodesConnections = {}
  const edgesConnections = {}

  for (let i = 0; i < nodesIdsToDisplay.length; i++) {
    const nodeId = nodesIdsToDisplay[i]
    const triples = triplesPerNode[nodeId]

    if (triples && triples.length > 0) {
      triples.map((triple) => {
        const {
          from,
          predicate,
          to
        } = triple

        const edgeUniqueId = `${predicate}___${from}___${to}`
        const edgeLabel = objectPropertiesFromApi[predicate].rdfsLabel
        const fromObject = classesFromApi[from]
        fromObject.id = from
        fromObject.label = fromObject.rdfsLabel
        const fromLabel = fromObject.rdfsLabel
        const toObject = classesFromApi[to]
        toObject.id = to
        toObject.label = toObject.rdfsLabel
        const toLabel = toObject.rdfsLabel

        const edgeConnection = {
          from,
          fromLabel,
          to,
          toLabel,
        }

        const edge = {
          ...edgeConnection,
          label: edgeLabel,
          edgeId: predicate,
          id: edgeUniqueId
        }

        if (!addedEdges.includes(edgeUniqueId)) {
          addedEdges.push(edgeUniqueId)
          availableEdges.push(edge)

          if (edgesConnections[predicate] && !edgesConnections[predicate].includes(edge)) {
            edgesConnections[predicate].push(edgeConnection)
          } else {
            edgesConnections[predicate] = [edgeConnection]
          }

          if (nodesConnections[from] && !nodesConnections[from].includes(edge)) {
            nodesConnections[from].push(edge)
          } else {
            nodesConnections[from] = [edge]
          }

          if (nodesConnections[to] && !nodesConnections[to].includes(edge)) {
            nodesConnections[to].push(edge)
          } else {
            nodesConnections[to] = [edge]
          }
        }

        if (!addedNodes.includes(to)
          && toLabel
          && toLabel !== ''
        ) {
          addNode({
            availableNodesNormalised,
            availableNodes,
            addedNodes,
            nodeId: to,
            nodeIdObject: toObject
          })
        }

        if (!addedNodes.includes(from)
        && fromLabel
        && fromLabel !== ''
        ) {
          addNode({
            availableNodesNormalised,
            availableNodes,
            addedNodes,
            nodeId: from,
            nodeIdObject: fromObject
          })
        }

        return true
      })
    }
  }

  setStoreState('availableNodesNormalised', availableNodesNormalised)
  setStoreState('availableNodes', availableNodes)
  setStoreState('availableEdges', availableEdges)
  setStoreState('nodesConnections', JSON.parse(JSON.stringify(nodesConnections)))
  setStoreState('edgesConnections', JSON.parse(JSON.stringify(edgesConnections)))
}

export default serialiseNodesEdges
