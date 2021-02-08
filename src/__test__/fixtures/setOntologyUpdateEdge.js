import { OwlClasses } from './test-ontology-classes'
import { OwlObjectProperties } from './test-ontology-object-properties'

const newOwlObjectProperties = {
  ...OwlObjectProperties,
  'http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM': {
    ...OwlObjectProperties['http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM'],
    label: 'New edge',
    owlAnnotationProperties: {
      'http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM': 'Another edge',
      'http://webprotege.stanford.edu/RtMeQat8p1tL74b64dS2qs': 'Record',
    },
    rdfsLabel: 'New edge',
  },
}

export const addToObjectFixture = {
  classesFromApi: OwlClasses,
  classesFromApiBackup: OwlClasses,
  deletedNodes: [],
  objectPropertiesFromApi: newOwlObjectProperties,
  objectPropertiesFromApiBackup: OwlObjectProperties,
  addedNodes: [],
  updatedNodes: [],
  deletedEdges: [],
  addedEdges: [],
  deletedConnections: [],
  addedConnections: [],
  updatedEdges: ['http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM']
}

export const setStoreStateFixture = [
  [
    'objectPropertiesFromApi',
    newOwlObjectProperties
  ],
  [
    'updatedEdges',
    ['http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM']
  ]
]
