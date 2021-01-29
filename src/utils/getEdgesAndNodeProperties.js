import store from '../store'
/**
 * Updated nodesIdsToDisplay in store filtering nodes in graph by string
 * @param  {Object}   params
 * @param  {Object}   params.classesFromApi   Nodes from initial OwlClasses
 * @param  {String}   params.searchFilter     Search string
 * @param  {Function} params.setStoreState    setStoreState action
 * @return
 */
const getEdgesAndNodeProperties = ({
  // classesFromApi,
  // objectPropertiesFromApi,
  setStoreState,
  searchFilter
}) => {
  const {
    classesFromApi,
    objectPropertiesFromApi
  } = store.getState()
  // const { OwlClasses } = JSON.parse(JSON.stringify(classesFromApi))
  // const { objectPropertiesFromApi } = JSON.parse(JSON.stringify(objectPropertiesFromApi))

  // if (!OwlClasses) return

  const nodesIds = Object.keys(classesFromApi)
  // const edgesIds = Object.keys(objectPropertiesFromApi)
  const nodesPropsToDisplay = []
  const edgePropsToDisplay = []

  // For nodes
  // ClassesfromApi
  for (const nodeIndex in nodesIds) {
    const nodeId = nodesIds[nodeIndex]
    const nodeIdObject = classesFromApi[nodeId]
    // const nodeObjectKeysNodeIdObjectProperty

    console.log(classesFromApi)

    // loop here search which are keys of type string
    // if type string push to array (if string then assume property push to array)
    // each node from classesFromApi
    // from value new loop on each check object keys map filter params strings
    // then look through

    // nodeIdObject.id = nodeId
    // nodeIdObject.label = nodeIdObject.rdfsLabel



    // TODO: now just searching for label, next search also for other keys
    // if (searchFilter !== ''
    //   && nodeIdObject.label
    //   && !nodeIdObject.label.toLowerCase().includes(searchFilter.toLowerCase())
    // ) continue

    // nodesIdsToDisplay.push(nodeId)
  }

  // Now do edge property searches
  // objectPropertiesFromApi
  for (const nodeIndex in nodesIds) {
    const nodeId = nodesIds[nodeIndex]
    const nodeIdObject = objectPropertiesFromApi[nodeId]

    // loop here search which are keys of type string
    // if type string push to array (if string then assume property push to array)

    // nodeIdObject.id = nodeId
    // nodeIdObject.label = nodeIdObject.rdfsLabel

    // TODO: now just searching for label, next search also for other keys
    // if (searchFilter !== ''
    //   && nodeIdObject.label
    //   && !nodeIdObject.label.toLowerCase().includes(searchFilter.toLowerCase())
    // ) continue

    // nodesIdsToDisplay.push(nodeId)
  }

  setStoreState('filterNodesByPropElementArray', nodesPropsToDisplay)
  setStoreState('filterEdgesByPropElementArray', edgePropsToDisplay)
}

export default getEdgesAndNodeProperties
