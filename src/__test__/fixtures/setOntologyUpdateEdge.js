import { OwlClasses } from './test-ontology-classes'
import { OwlObjectProperties } from './test-ontology-object-properties'
import { availableEdgesNormalised } from './availableEdgesNormalised'

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

const newAvailableEdgesNormalised = {
  ...availableEdgesNormalised,
  'http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM': {
    rdfAbout: 'http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM',
    rdfsLabel: 'New edge',
    skosDefinition: null,
    skosComment: null,
    owlAnnotationProperties: {
      'http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM': 'Another edge',
      'http://webprotege.stanford.edu/RtMeQat8p1tL74b64dS2qs': 'Record',
    },
    rdfsSubPropertyOf: [
      'http://webprotege.stanford.edu/R8zMIKp038MgC2umoxwzWBJ',
    ],
    label: 'New edge'
  }
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
    'availableEdgesNormalised',
    newAvailableEdgesNormalised
  ],

  [
    'updatedEdges',
    ['http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM']
  ]
]
