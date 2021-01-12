const setNetworkMethods = async ({
  setStoreState,
  network,
  addToArray,
  isNodeSelectable,
  isEdgeSelectable,
  nodesIdsToDisplay
}) => {
  network?.on('selectNode', (event) => {
    if (event.nodes?.length === 1) {
      if (isNodeSelectable) {
        addToArray('selectedNodes', event.nodes[0])
      }

      if (!nodesIdsToDisplay.includes(event.nodes[0])) {
        const newNodesIdsToDisplay = [
          ...nodesIdsToDisplay,
          event.nodes[0]
        ]

        setStoreState('nodesIdsToDisplay', newNodesIdsToDisplay)
      }
    }
  })

  network?.on('selectEdge', (event) => {
    if (event.edges?.length === 1) {
      if (isEdgeSelectable) {
        addToArray('selectedEdges', event.edges[0])
      }
    }
  })

  network?.on('stabilizationProgress', (params) => {
    const percentage = parseFloat(params.iterations / params.total).toFixed(2)

    setStoreState('networkLoadingProgress', percentage * 100)
  })

  network?.once('stabilizationIterationsDone', () => {
    setStoreState('networkLoadingProgress', 0)
    setStoreState('isNetworkLoading', false)
  })

  await network?.stabilize(2000)

  network?.fit()
}

export default setNetworkMethods
