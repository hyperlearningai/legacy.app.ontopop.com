import { OwlClasses } from './test-ontology-classes.json'
import { OwlObjectProperties } from './test-ontology-object-properties.json'

export const graphVersions = {
  original: {
    classesFromApi: OwlClasses,
    objectPropertiesFromApi: OwlObjectProperties,
    classesFromApiBackup: OwlClasses,
    objectPropertiesFromApiBackup: OwlObjectProperties,
    deletedNodes: [],
    addedNodes: [],
    updatedNodes: [],
    deletedEdges: [],
    addedEdges: [],
    updatedEdges: [],
    deletedConnections: [],
    addedConnections: [],
  },
}
