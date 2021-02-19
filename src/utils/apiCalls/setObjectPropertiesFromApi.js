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
  const objectProperties = {}

  edges.map((edge) => {
    const { edgeId, role } = edge

    objectProperties[edgeId] = {
      ...edge,
      id: edgeId,
      label: role
    }

    return true
  })

  setStoreState('objectPropertiesFromApi', objectProperties)
  setStoreState('objectPropertiesFromApiBackup', objectProperties)
}

export default setObjectPropertiesFromApi
