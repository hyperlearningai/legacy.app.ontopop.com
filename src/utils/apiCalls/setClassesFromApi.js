import { NODE_TYPE } from '../../constants/graph'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'

/**
 * Narmalise nodes array from API
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue              updateStoreValue action
 * @param  {Array}    params.nodes                      Nodes from API
 * @return {undefined}
 */
const setClassesFromApi = ({
  updateStoreValue,
  nodes
}) => {
  const classes = nodes

  const classesIds = Object.keys(classes)
  const classesIdsLength = classesIds.length - 1

  for (let index = classesIds.length - 1; index >= 0; index--) {
    const nodeId = classesIds[classesIdsLength - index]

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
  }

  updateStoreValue(['classesFromApi'], OPERATION_TYPE_UPDATE, classes)
  updateStoreValue(['classesFromApiBackup'], OPERATION_TYPE_UPDATE, classes)
}

export default setClassesFromApi
