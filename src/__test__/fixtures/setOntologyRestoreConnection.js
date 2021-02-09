/* eslint max-len:0 */
import { OwlClasses } from './test-ontology-classes'
import { OwlObjectProperties } from './test-ontology-object-properties'

export const addToObjectFixture = {
  addedNodes: [],
  classesFromApi: OwlClasses,
  classesFromApiBackup: OwlClasses,
  deletedNodes: [],
  objectPropertiesFromApi: OwlObjectProperties,
  objectPropertiesFromApiBackup: OwlObjectProperties,
  updatedNodes: [],
  deletedEdges: [],
  addedEdges: [],
  updatedEdges: [],
  deletedConnections: [],
  addedConnections: [],
}

export const setStoreStateFixture = [
  [
    'deletedConnections',
    [],
  ],
  [
    'classesFromApi',
    OwlClasses,
  ],
]
