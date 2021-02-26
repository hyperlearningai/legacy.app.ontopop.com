import { classesFromApi } from './classesFromApi'
import { objectPropertiesFromApi } from './objectPropertiesFromApi'

export const graphVersions = {
  original: {
    classesFromApi,
    objectPropertiesFromApi,
    classesFromApiBackup: classesFromApi,
    objectPropertiesFromApiBackup: objectPropertiesFromApi,
    deletedNodes: [],
    addedNodes: [],
    updatedNodes: [],
    deletedEdges: [],
    addedEdges: [],
    updatedEdges: [],
  },
}
