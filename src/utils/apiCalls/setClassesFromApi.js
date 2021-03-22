import { NODE_TYPE } from '../../constants/graph'

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
  const classes = nodes

  Object.keys(classes).map((nodeId) => {
    const nodeObject = classes[nodeId]

    const {
      id,
      rdfsLabel,
      label,
      name
    } = nodeObject

    let viewLabel = rdfsLabel

    if (label === 'dataset') {
      viewLabel = name
    }

    classes[id] = {
      ...nodeObject,
      id: id.toString(),
      label: viewLabel,
      [NODE_TYPE]: label === 'dataset' ? 'dataset' : 'class'
    }

    return true
  })

  setStoreState('classesFromApi', classes)
  setStoreState('classesFromApiBackup', classes)
}

export default setClassesFromApi
