import store from '../store'
/**
 * Get edges properties
 * @param  {Object}   params
 * @param  {Function} params.setStoreState    setStoreState action
 * @return {undefined}
 */
const getEdgesProperties = ({
  setStoreState
}) => {
  const {
    objectPropertiesFromApi,
  } = store.getState()

  const edgesIds = Object.keys(objectPropertiesFromApi)

  const edgesPropsToDisplay = []

  edgesIds
    .filter((edgeId, index) => index < 10)
    .map((edgeId) => {
      const edgeIdObject = objectPropertiesFromApi[edgeId]

      const edgeProperties = Object.keys(edgeIdObject)

      return edgeProperties?.map((property) => {
        if (!edgeIdObject[property] || typeof edgeIdObject[property] === 'object') return false
        if (['id', 'label'].includes(property)) return false

        if (!edgesPropsToDisplay.includes(property)) {
          edgesPropsToDisplay.push(property)
        }

        return true
      })
    })

  setStoreState('edgesProperties', edgesPropsToDisplay.map((prop) => ({
    label: prop,
    value: prop
  })))
}

export default getEdgesProperties
