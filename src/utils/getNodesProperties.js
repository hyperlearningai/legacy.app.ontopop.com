import store from '../store'
/**
 * Get nodes properties
 * @param  {Object}   params
 * @param  {Function} params.setStoreState    setStoreState action
 * @return {undefined}
 */
const getNodesProperties = ({
  setStoreState
}) => {
  const {
    classesFromApi,
  } = store.getState()

  const nodesIds = Object.keys(classesFromApi)

  const nodesPropsToDisplay = []

  nodesIds
    .filter((nodeId, index) => index < 10)
    .map((nodeId) => {
      const nodeIdObject = classesFromApi[nodeId]

      const nodeProperties = Object.keys(nodeIdObject)

      return nodeProperties?.map((property) => {
        if (!nodeIdObject[property] || typeof nodeIdObject[property] === 'object') return false
        if (['id', 'label'].includes(property)) return false

        if (!nodesPropsToDisplay.includes(property)) {
          nodesPropsToDisplay.push(property)
        }

        return true
      })
    })

  setStoreState('nodesProperties', nodesPropsToDisplay.map((prop) => ({
    label: prop,
    value: prop
  })))
}

export default getNodesProperties
