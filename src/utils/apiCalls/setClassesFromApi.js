/**
 * Narmalise nodes array from API
 * @param  {Object}   params
 * @param  {Function} params.setStoreState              setStoreState action
 * @param  {Array}    params.nodes                      Nodes from API
 * @return {undefined}
 */
const setClassesFromApi = ({
  setStoreState,
  nodes
}) => {
  const classes = {}

  nodes.map((node) => {
    const { id, rdfsLabel } = node

    classes[id] = {
      ...node,
      id: id.toString(),
      label: rdfsLabel
    }

    return true
  })

  setStoreState('classesFromApi', classes)
  setStoreState('classesFromApiBackup', classes)
}

export default setClassesFromApi
