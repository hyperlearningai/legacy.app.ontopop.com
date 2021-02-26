/**
 * Narmalise nodes array from API
 * @param  {Object}   params
 * @param  {Function} params.setStoreState              setStoreState action
 * @param  {Array}    params.nodes                      Nodes from API
 * @return {undefined}
 */
const setObjectPropertiesFromApi = ({
  setStoreState,
  edges
}) => {
  const objectProperties = edges

  Object.keys(objectProperties).map((edgeId) => {
    const edge = objectProperties[edgeId]

    const {
      from,
      to,
      id,
      rdfsLabel
    } = edge

    objectProperties[edgeId] = {
      ...edge,
      id: id.toString(),
      label: rdfsLabel,
      from: from.toString(),
      to: to.toString()
    }

    return true
  })

  setStoreState('objectPropertiesFromApi', objectProperties)
  setStoreState('objectPropertiesFromApiBackup', objectProperties)
}

export default setObjectPropertiesFromApi
