import { classesFromApi } from './classesFromApi'
import { objectPropertiesFromApi } from './objectPropertiesFromApi'

const newOwlObjectProperties = {
  ...objectPropertiesFromApi,
}

export const addToObjectFixture = {
  classesFromApi,
  classesFromApiBackup: classesFromApi,
  deletedNodes: [],
  objectPropertiesFromApi: newOwlObjectProperties,
  objectPropertiesFromApiBackup: objectPropertiesFromApi,
  addedNodes: [],
  updatedNodes: [],
  deletedEdges: [],
  addedEdges: [],
  updatedEdges: ['http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM']
}

export const updateStoreValueFixture = [
  [
    'objectPropertiesFromApi',
    newOwlObjectProperties
  ],
  [
    'updatedEdges',
    ['http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM']
  ]
]
