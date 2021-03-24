import { OPERATION_TYPE_UPDATE } from '../../constants/store'

/**
 * Narmalise nodes array from API
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue              updateStoreValue action
 * @param  {Array}    params.nodes                      Nodes from API
 * @return {undefined}
 */
const setObjectPropertiesFromApi = ({
  updateStoreValue,
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

  updateStoreValue(['objectPropertiesFromApi'], OPERATION_TYPE_UPDATE, objectProperties)
  updateStoreValue(['objectPropertiesFromApiBackup'], OPERATION_TYPE_UPDATE, objectProperties)
}

export default setObjectPropertiesFromApi
