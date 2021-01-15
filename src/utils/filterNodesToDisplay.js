/**
 * Updated nodesIdsToDisplay in store filtering nodes in graph by string
 * @param  {Object}   params
 * @param  {Object}   params.classesFromApi   Nodes from initial OwlClasses
 * @param  {String}   params.searchFilter     Search string
 * @param  {Function} params.setStoreState    setStoreState action
 * @return
 */
const filterNodesToDisplay = ({
  classesFromApi,
  setStoreState,
  searchFilter
}) => {
  const { OwlClasses } = JSON.parse(JSON.stringify(classesFromApi))

  if (!OwlClasses) return

  const nodesIds = Object.keys(OwlClasses)

  const nodesIdsToDisplay = []

  for (const nodeIndex in nodesIds) {
    const nodeId = nodesIds[nodeIndex]
    const nodeIdObject = OwlClasses[nodeId]

    nodeIdObject.id = nodeId
    nodeIdObject.label = nodeIdObject.rdfsLabel

    // TODO: now just searching for label, next search also for other keys
    if (searchFilter !== ''
      && nodeIdObject.label
      && !nodeIdObject.label.toLowerCase().includes(searchFilter.toLowerCase())
    ) continue

    nodesIdsToDisplay.push(nodeId)
  }

  setStoreState('nodesIdsToDisplay', nodesIdsToDisplay)
}

export default filterNodesToDisplay
