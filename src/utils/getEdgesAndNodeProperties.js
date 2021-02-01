import store from '../store'
/**
 * Updated nodesIdsToDisplay in store filtering nodes in graph by string
 * @param  {Object}   params
 * @param  {Function} params.setStoreState    setStoreState action
 * @return {undefined}
 */
const getEdgesAndNodeProperties = ({
  setStoreState
}) => {
  const {
    classesFromApi,
    // objectPropertiesFromApi
  } = store.getState()

  const nodesIds = Object.keys(classesFromApi)
  // const edgesIds = Object.keys(objectPropertiesFromApi)

  const nodesPropsToDisplay = []
  // const edgePropsToDisplay = []

  nodesIds
    .filter((nodeId, index) => index < 10)
    .map((nodeId) => {
      const nodeIdObject = classesFromApi[nodeId]

      const nodeProperties = Object.keys(nodeIdObject)

      return nodeProperties?.map((property) => {
        if (!nodeIdObject[property] || typeof nodeIdObject[property] === 'object') return false
        if (['id', 'label'].includes(property)) return false

        // const propertyObject = { name: property, id: property }

        console.log({
          property,
          nodesPropsToDisplay,
          isIn: nodesPropsToDisplay.includes(property)
        })

        if (!nodesPropsToDisplay.includes(property)) {
          nodesPropsToDisplay.push(property)
        }

        return true
      })
    })

  // for (const edgeIndex in edgesIds) {
  //   const edgeId = edgesIds[edgeIndex]
  //   const edgeIdObject = objectPropertiesFromApi[edgeId]

  //   const edgeProperties = Object.keys(edgeIdObject)

  //   edgeProperties?.map((property) => {
  //     if (!edgeIdObject[property] || typeof edgeIdObject[property] === 'object') return false
  //     if (!edgeIdObject[property] || typeof edgeIdObject[property] === 'object') return false

  //     if (!nodesPropsToDisplay.includes(property)) {
  //       nodesPropsToDisplay.push({ name: property, id: property })
  //     }

  //     return true
  //   })

  //   if (edgeIdObject.rdfslabel !== null) {
  //     edgePropsToDisplay.push({ name: edgeIdObject.rdfsLabel, id: edgeIdObject.id })
  //   }
  // }

  // console.log({
  //   nodesPropsToDisplay
  // })
  setStoreState('filterNodesByPropElementArray', nodesPropsToDisplay.map((prop) => ({
    label: prop,
    value: prop
  })))
  // setStoreState('filterEdgesByPropElementArray', edgePropsToDisplay)
}

export default getEdgesAndNodeProperties
